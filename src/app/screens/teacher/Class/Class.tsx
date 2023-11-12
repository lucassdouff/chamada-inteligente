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
import 'moment/locale/pt-br';
import { AttendenceListItemDTO } from "../../../../core/dtos/AttendenceListItemDTO";
import { ListDataModel } from "../../../../core/models/ListDataModel";
import { ScrollView } from "react-native-gesture-handler";

export type StackParamList = {
    Class: { userClass: UserClassesDTO};
}

export default function ClassScreen({ route }: NativeStackScreenProps<StackParamList, 'Class'>) {
    
    const navigation = useNavigation<StackNavigationProp<any>>();
    
    const { userClass } = route.params
    const { userSession } = navigationController();
    
    const [classStats, setClassStats] = useState<ClassStatsDTO>();
    const [teacherRollHistory, setTeacherRollHistory] = useState<TableDataModel[][]>();
    const [attendenceList, setAttendenceList] = useState<{
        attendance_roll: ListDataModel[];
        id_attendance_roll: number;
        end_datetime?: Date;
    }>();

    const [modalVisible, setModalVisible] = useState(false);

    const changeAttendenceAlert = (id_student: number | undefined) =>
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
                const newState = prevState?.attendance_roll ? [...prevState.attendance_roll] : [];
                const index = newState.findIndex((item) => item.id === id_student);
                newState[index] = { ...newState[index], info: { description: 'AUSENTE', action: () => {changeAttendenceAlert(id_student)} } };
                return {attendance_roll: newState, id_attendance_roll: prevState?.id_attendance_roll || 0};
            
            });
        },
        
        },
        {
        text: 'PRESENTE', 
        onPress: () => {
            setAttendenceList((prevState) => {
                const newState = prevState?.attendance_roll ? [...prevState.attendance_roll] : [];
                const index = newState.findIndex((item) => item.id === id_student);
                newState[index] = { ...newState[index], info: { description: 'PRESENTE', action: () => {changeAttendenceAlert(id_student)} } };
                return {attendance_roll: newState, id_attendance_roll: prevState?.id_attendance_roll || 0};
            });
        }
        },
    ]);

    const handleAttendenceRoll = (id_attendance_roll: number, end_datetime: Date | undefined) => {
        
        const fetchAttendenceRoll = async () => {
            const response = await axios.get<AttendenceListItemDTO[]>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendanceRoll/atendees`, {
                params: {
                    id_class: userClass.id_class,
                    id_attendance_roll: id_attendance_roll,
                }
            })
            .catch(error => {console.log(error.response.data)});

            const userAttendenceList : AttendenceListItemDTO[] | undefined = response?.data;

            const attendenceListMapped : ListDataModel[] | undefined = userAttendenceList?.map(attendence => {
                return {
                    id: attendence.id_student,
                    id_course: attendence.id_course,
                    enrollment: attendence.enrollment,
                    name: attendence.name,
                    info: {
                        description: attendence.present ? 'PRESENTE' : 'AUSENTE',
                        action: () => {
                            changeAttendenceAlert(attendence.id_student);
                        },
                    }
                }
            });

            setAttendenceList({
                attendance_roll: attendenceListMapped || [],
                id_attendance_roll: id_attendance_roll,
                end_datetime: end_datetime,
            }
            );
        };

        fetchAttendenceRoll();

        setModalVisible(!modalVisible);
    };

    const handleUpdateAttendenceRoll = () => {

        const updateAttendenceRoll = async () => {

            const attendenceListMapped : AttendenceListItemDTO[] | undefined = attendenceList?.attendance_roll?.map(attendence => {
                return {
                    name: attendence.name,
                    id_course: attendence.id_course,
                    enrollment: attendence.enrollment,
                    id_student: attendence.id,
                    present: attendence.info?.description === 'PRESENTE' ? true : false,
                }
            });

            const response = await axios.put(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendance`, {
                attendance_roll: attendenceListMapped,
                id_attendance_roll: attendenceList?.id_attendance_roll,
            })
            .catch(error => {console.log(error.response.data)});

            if(response?.status === 200) {
                setModalVisible(!modalVisible);
                Alert.alert('CHAMADA SALVA', 'A chamada foi salva com sucesso!');
            } else {
                Alert.alert('ERRO', 'Ocorreu um erro ao salvar a chamada!');
            }
        };

        updateAttendenceRoll();
    }

    const handleEndAttendanceRoll = () => {
        
        const endAttendanceRoll = async () => {

            const response = await axios.put(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendanceRoll/end`, {
                id_attendance_roll: attendenceList?.id_attendance_roll,
	            end_datetime: new Date()
            })
            .catch(error => {console.log(error.response.data)});

            if(response?.status === 200) {
                setModalVisible(!modalVisible);
                Alert.alert('CHAMADA ENCERRADA', 'A chamada foi encerrada com sucesso!');
            } else {
                Alert.alert('ERRO', 'Ocorreu um erro ao encerrar a chamada!');
            }
        }

        endAttendanceRoll();
    }

    const startCallAlert = () =>
    Alert.alert('INICIAR CHAMADA', 'Tem certeza que quer iniciar uma chamada?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {

        const createAttendenceRoll = async () => {
            try {
                const response = await axios.post<TeacherRollHistoryDTO>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendanceRoll`, 
                    {
                        id_class: userClass.id_class,
                        start_datetime: new Date(),
                    },
                );

                const userAttendanceRoll : TeacherRollHistoryDTO | undefined = response?.data;

                setTeacherRollHistory((prevState) => {
                    const newState = prevState ? [...prevState] : [];
                    const historyItem = [
                        {text: new Date(userAttendanceRoll?.start_datetime).toLocaleDateString(), action: undefined},
                        {text: moment(userAttendanceRoll?.start_datetime).format("LT"), action: undefined},
                        {text: "0", action: undefined},
                        {text: "0%", action: undefined},
                        {text: 'CONSULTAR', action: () => {
                            handleAttendenceRoll(userAttendanceRoll?.id_attendance_roll, userAttendanceRoll?.end_datetime);
                        }}
                    ];

                    newState.push(historyItem || []);

                    return newState;
                });
                
                if(response.status === 200) {
                    Alert.alert('CHAMADA INICIADA', 'A chamada foi iniciada com sucesso!');
                }

            } catch (error) {
                console.log(error);
            };
        };

        createAttendenceRoll();
        }
      },
    ]);

    useEffect(() => {
        const fetchClassStats = async () => {
            const response = await axios.get<ClassStatsDTO>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/class/stats`, {
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
                const response = await axios.get<TeacherRollHistoryDTO[]>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendanceRoll/history/teacher`, {
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
                            {text: moment(attendance.start_datetime).format("LT") + (attendance.end_datetime ? " - " + moment(attendance.end_datetime).format("LT") : ''), action: undefined},
                            {text: attendance.present_students.toString(), action: undefined},
                            {text: attendance.percentage + '%', action: undefined},
                            {text: 'CONSULTAR', action: () => {
                                handleAttendenceRoll(attendance.id_attendance_roll, attendance.end_datetime);
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
        <ScrollView className="flex-col py-2 px-4 w-full mt-2 divide-gray-500 divide-y overflow-auto">
            <View className="mb-6">
                <ClassCardComponent userClass={userClass} staticMode schedule={userClass.class_schedule} iconActionButton={()=>{
                    navigation.navigate("Gerenciar Turma", {userClass : userClass})
                }} />

                <View className="self-center w-3/4 mt-4">
                <View className="mb-2">
                    <Button title="INICIAR CHAMADA" color='blue' onPress={startCallAlert} />
                </View>
                    <Button title="AGENDAR CHAMADA" color='orange' onPress={() => {navigation.navigate('Gerenciar Chamadas', {userClass: userClass});}} />
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

            <View className="flex-col mb-4">
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
                    <View className="flex-col">
                        <ListComponent listType={"student"} listData={attendenceList?.attendance_roll} />

                        {attendenceList?.end_datetime ? 
                            new Date(attendenceList.end_datetime) < new Date() ? 
                                <View className="flex-col mt-4">
                                    <Text className="text-center">A chamada foi encerrada!</Text>
                                </View>
                            :   <View className="flex-col mt-4">
                                    <Text className="text-center">A chamada está em andamento! Fim {
                                        moment(new Date(attendenceList.end_datetime)).locale("pt-br").endOf('minute').fromNow()
                                    }</Text>
                                </View>
                        : <Button title="ENCERRAR CHAMADA" color='red' onPress={handleEndAttendanceRoll} />
                        }
                    </View>

                    <View className="flex-col mb-8">
                        <View className="mb-2">
                            <Button title="SALVAR ALTERAÇÕES" color='green' onPress={handleUpdateAttendenceRoll} />
                        </View>
                        <Button title="CANCELAR" color='red' onPress={() => {setModalVisible(!modalVisible);}} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}