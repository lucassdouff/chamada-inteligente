import { Button, Modal, Text, View } from "react-native";
import ClassCardComponent from "../../../../components/Cards/ClassCardComponent";
import TableComponent from "../../../../components/Tables/TableComponent";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import ListComponent from "../../../../components/Lists/ListComponent";
import { UserClassesDTO } from "../../../../core/dtos/UserClassesDTO";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { navigationController } from "../../../../core/controllers/NavigationController";
import { TableDataModel } from "../../../../core/models/TableDataModel";
import { ClassStatsDTO } from "../../../../core/dtos/ClassStatsDTO";
import { TeacherRollHistoryDTO } from "../../../../core/dtos/TeacherRollHistoryDTO";
import moment from "moment";

export type StackParamList = {
    Class: { userClass: UserClassesDTO};
}

export default function ClassScreen({ route }: NativeStackScreenProps<StackParamList, 'Class'>) {
    
    const navigation = useNavigation<StackNavigationProp<any>>();
    
    const { userClass } = route.params
    const { userSession } = navigationController();
    
    const [classStats, setClassStats] = useState<ClassStatsDTO>();
    const [teacherRollHistory, setTeacherRollHistory] = useState<TableDataModel[][]>();

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchClassStats = async () => {
            const response = await axios.get<ClassStatsDTO>(`http://192.168.0.141:3000/class/stats`, {
                params: {
                    id_class: userClass.id_class,
                }
            })
                .catch(error => {console.log(error.response.data)});
            
            const userClassStats : ClassStatsDTO | undefined = response?.data;

            setClassStats(userClassStats);
        };

        const fetchTeacherRollHistory = async () => {
            try {
                const response = await axios.get<TeacherRollHistoryDTO[]>(`http://192.168.0.141:3000/attendanceRoll/history/teacher`, {
                    params: {
                        id_class: userClass.id_class,
                    }
                });

                const userAttendanceRollHistory : TeacherRollHistoryDTO[] | undefined = response?.data;

                const history : TableDataModel[][] = [
                    [{text: 'DATA', action: undefined}, {text: 'HORÁRIO', action: undefined}, {text: 'ALUNOS PRESENTES', action: undefined}, {text: 'MÉDIA DE PRESENÇA', action: undefined}, {text: '', action: undefined}],
                ];

                userAttendanceRollHistory?.forEach(attendance => {
                        const historyItem = [
                            {text: new Date(attendance.start_datetime).toLocaleDateString(), action: undefined},
                            {text: moment(attendance.start_datetime).format("LT") + " - " + moment(attendance.end_datetime).format("LT"), action: undefined},
                            {text: attendance.present_students.toString(), action: undefined},
                            {text: attendance.percentage + '%', action: undefined},
                            {text: 'EDITAR', action: () => {setModalVisible(true)}}
                        ];
    
                        history.push(historyItem || []);
                });

                setTeacherRollHistory(history);

            } catch (error) {
                console.log(error);
            };
        }
    
        fetchTeacherRollHistory();
        
        fetchClassStats();

    }, [userClass.id_class, userSession?.id]);

    return(
        <View className="flex-col py-2 px-4 w-full mt-2 divide-gray-500 divide-y overflow-auto">
            <View className="mb-6">
                <ClassCardComponent userClass={userClass} staticMode schedule={userClass.class_schedule} />

                <View className="self-center w-3/4 mt-4">
                    <Button title="GERENCIAR CHAMADAS" color='blue' onPress={() => {navigation.navigate('Gerenciar Chamadas');}} />
                </View>
            </View>

            <View className="flex-col mb-4">
                <Text className="my-4 text-xl">Informações da Turma</Text>
                <View className="flex-col gap-4 p-2">
                    <View className="flex-row justify-between">
                        <Text>Total de alunos inscritos:</Text>
                        <Text>{classStats?.totalStudents} aluno(s)</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Média de frequência dos alunos:</Text>
                        <Text>{classStats?.attendancePercentage}%</Text>
                    </View>
                </View>
            </View>

            <View className="flex-col">
                <Text className="my-4 text-xl">Histórico de chamadas</Text>
                <View className="self-center">
                    <TableComponent tableData={teacherRollHistory} />
                </View>
            </View>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                <View className="flex-col justify-between h-full py-2 px-4 w-full mt-2 overflow-auto">

                    <ListComponent listType={"student"} listData={[
                        {
                            name: 'Roberto Carlos Filho',
                            info: {
                                present: true,
                                action: () => {}
                            }
                        },
                        {
                            name: 'Roberto Carlos Filho Júnior',
                            info: {
                                present: false,
                                action: () => {}
                            }
                        }
                    ]} />

                    <View className="flex-col mb-8">
                        <View className="mb-2">
                            <Button title="SALVAR" color='green' onPress={() => {}} />
                        </View>
                        <Button title="CANCELAR" color='red' onPress={() => {setModalVisible(!modalVisible);}} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}