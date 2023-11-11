import { Alert, Button, Modal, Text, View } from "react-native";
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
import { AttendenceListItemDTO } from "../../../../core/dtos/AttendenceListItemDTO";
import { ListDataModel } from "../../../../core/models/ListDataModel";

export type StackParamList = {
    Class: { userClass: UserClassesDTO};
}

export default function ClassScreen({ route }: NativeStackScreenProps<StackParamList, 'Class'>) {
    
    const navigation = useNavigation<StackNavigationProp<any>>();
    
    const { userClass } = route.params
    const { userSession } = navigationController();
    
    const [classStats, setClassStats] = useState<ClassStatsDTO>();
    const [teacherRollHistory, setTeacherRollHistory] = useState<TableDataModel[][]>();
    const [attendenceList, setAttendenceList] = useState<ListDataModel[]>();

    const [modalVisible, setModalVisible] = useState(false);

    const changeAttendenceAlert = (id_student: number) =>
    Alert.alert('MODIFICAR PRESENÇA', 'Selecione a opção de presença desejada:', [
        {
            text: 'CANCELAR',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
        text: 'AUSENTE',
        onPress: () => {
            setAttendenceList((prevState) => {
                const newState = prevState ? [...prevState] : [];
                const index = newState.findIndex((item) => item.id === id_student);
                newState[index] = { ...newState[index], info: { description: 'AUSENTE', action: () => {changeAttendenceAlert(id_student)} } };
                return newState;
            });
        },
        
        },
        {
        text: 'PRESENTE', 
        onPress: () => {
            setAttendenceList((prevState) => {
                const newState = prevState ? [...prevState] : [];
                const index = newState.findIndex((item) => item.id === id_student);
                newState[index] = { ...newState[index], info: { description: 'PRESENTE', action: () => {changeAttendenceAlert(id_student)} } };
                return newState;
            });
        }
        },
    ]);

    const handleAttendenceRoll = (attendence_id: number) => {
        
        const fetchAttendenceRoll = async () => {
            const response = await axios.get<AttendenceListItemDTO[]>(`http://192.168.0.141:3000/attendanceRoll/atendees`, {
                params: {
                    id_class: userClass.id_class,
                    id_attendance_roll: attendence_id,
                }
            })
            .catch(error => {console.log(error.response.data)});

            const userAttendenceList : AttendenceListItemDTO[] | undefined = response?.data;

            const attendenceListMapped : ListDataModel[] | undefined = userAttendenceList?.map(attendence => {
                return {
                    id: attendence.id_student,
                    name: attendence.id_student.toString(),
                    info: {
                        description: attendence.present ? 'PRESENTE' : 'AUSENTE',
                        action: () => {
                            changeAttendenceAlert(attendence.id_student);
                        },
                    }
                }
            });

            setAttendenceList(attendenceListMapped);
        };

        fetchAttendenceRoll();

        setModalVisible(!modalVisible);
    };

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
                    if(new Date(attendance.start_datetime) <= new Date()) {
                        const historyItem = [
                            {text: new Date(attendance.start_datetime).toLocaleDateString(), action: undefined},
                            {text: moment(attendance.start_datetime).format("LT") + " - " + moment(attendance.end_datetime).format("LT"), action: undefined},
                            {text: attendance.present_students.toString(), action: undefined},
                            {text: attendance.percentage + '%', action: undefined},
                            {text: 'CONSULTAR', action: () => {
                                handleAttendenceRoll(attendance.id_attendance_roll);
                            }}
                        ];
    
                        history.push(historyItem || []);
                    }
                });

                setTeacherRollHistory(history);

            } catch (error) {
                console.log(error);
            };
        }
    
        fetchTeacherRollHistory();
        
        fetchClassStats();

    }, [userClass.id_class, userSession?.id, modalVisible]);

    return(
        <View className="flex-col py-2 px-4 w-full mt-2 divide-gray-500 divide-y overflow-auto">
            <View className="mb-6">
                <ClassCardComponent userClass={userClass} staticMode schedule={userClass.class_schedule} />

                <View className="self-center w-3/4 mt-4">
                    <Button title="GERENCIAR CHAMADAS" color='blue' onPress={() => {navigation.navigate('Gerenciar Chamadas', {userClass: userClass});}} />
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
                    <ListComponent listType={"student"} listData={attendenceList} />

                    <View className="flex-col mb-8">
                        <View className="mb-2">
                            <Button title="SALVAR ALTERAÇÕES" color='green' onPress={() => {}} />
                        </View>
                        <Button title="CANCELAR" color='red' onPress={() => {setModalVisible(!modalVisible);}} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}