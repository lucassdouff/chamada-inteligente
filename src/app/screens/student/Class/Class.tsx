import { View, Text, Switch, Button, ScrollView } from "react-native";
import ClassCardComponent from "../../../../components/Cards/ClassCardComponent";
import TableComponent from "../../../../components/Tables/TableComponent";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserClassesDTO } from "../../../../core/dtos/UserClassesDTO";
import axios from "axios";
import { navigationController } from "../../../../core/controllers/NavigationController";
import { StudentAttendanceStatsDTO } from "../../../../core/dtos/StudentAttendanceStatsDTO";
import { StudentRollHistoryDTO } from "../../../../core/dtos/StudentRollHistoryDTO";
import { TableDataModel } from "../../../../core/models/TableDataModel";
import moment from "moment";

export type StackParamList = {
    Class: { userClass: UserClassesDTO};
}

export default function ClassScreen({ route }: NativeStackScreenProps<StackParamList, 'Class'>) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [studentAttendanceStats, setStudentAttendanceStats] = useState<StudentAttendanceStatsDTO>();
    const [studentRollHistory, setStudentRollHistory] = useState<TableDataModel[][]>();

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    const { userSession } = navigationController();
    const { userClass } = route.params

    useEffect(() => {
        const fetchStudentAttendanceStats = async () => {
            const response = await axios.get<StudentAttendanceStatsDTO>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendance/stats/${userClass.id_class}/${userSession?.id}`)
                .catch(error => {console.log(error.response.data)});
            
            const userAttendanceStats : StudentAttendanceStatsDTO | undefined = response?.data;

            setStudentAttendanceStats(userAttendanceStats);
        };

        const fetchStudentRollHistory = async () => {
            try {
                const response = await axios.get<StudentRollHistoryDTO[]>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendanceRoll/history/student`, {
                    params: {
                        id_class: userClass.id_class,
                        id_student: userSession?.id
                    }
                });

                const userAttendanceRollHistory : StudentRollHistoryDTO[] | undefined = response?.data;

                const history : TableDataModel[][] = [
                    [{text: 'DATA', action: undefined}, {text: 'HORÁRIO', action: undefined}, {text: 'PRESENÇA', action: undefined}, {text: '', action: undefined}],
                ];

                userAttendanceRollHistory?.forEach(attendance => {
                    if(attendance.end_datetime) {
                        const historyItem = [
                            {text: new Date(attendance.start_datetime).toLocaleDateString(), action: undefined},
                            {text: moment(attendance.start_datetime).format("LT") + " - " + moment(attendance.end_datetime).format("LT"), action: undefined},
                            {text: attendance.present ? 'PRESENTE' : 'AUSENTE', action: undefined},
                            {text: 'CONSULTAR', action: () => {
                                navigation.navigate('Consultar Aula', {
                                    attendance_id: attendance.id_attendance_roll,
                                    start_date: attendance.start_datetime,
                                    presence: attendance.present,
                                    
                                });
                            }}
                        ];
    
                        history.push(historyItem || []);
                    }
                });

                setStudentRollHistory(history);

            } catch (error) {
                console.log(error);
            };

        }
    
        fetchStudentRollHistory();
        
        fetchStudentAttendanceStats();

    }, [userClass.id_class, userSession?.id]);
   
    const navigation = useNavigation<StackNavigationProp<any>>();
    
    return(
        <ScrollView className="flex-col py-2 px-4 w-full mt-2 divide-gray-500 divide-y overflow-auto">
            <View className="mb-6">
                <ClassCardComponent userClass={userClass} staticMode schedule={userClass.class_schedule} />

                <View className="flex-row justify-between items-center px-2">
                    <Text className="text-lg">Presença Automática:</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#2564eb83'}}
                        thumbColor={isEnabled ? '#2563EB' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View className="self-center w-3/4 mt-2">
                    <Button title="INDICAR PRESENÇA" disabled={isEnabled} onPress={() => {}} color="blue" />
                </View>
            </View>

            <View className="flex-col mb-6">
                <Text className="my-4 text-xl">Informações do Aluno</Text>
                <View className="flex-col gap-4 p-2">
                    <View className="flex-row justify-between">
                        <Text>Total de faltas:</Text>
                        <Text>{studentAttendanceStats?.totalAbsences} falta(s)</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Percentual de faltas:</Text>
                        <Text>{studentAttendanceStats?.absencePercentage}%</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Tempo médio de presença:</Text>
                        <Text>{studentAttendanceStats?.averagePresenceTime} min</Text>
                    </View>
                </View>
            </View>

            <View className="flex-col">
                <Text className="my-4 text-xl">Histórico de aulas</Text>
                <View className="self-center">
                    <TableComponent tableData={studentRollHistory} />
                </View>
            </View>
        </ScrollView>
    );
}