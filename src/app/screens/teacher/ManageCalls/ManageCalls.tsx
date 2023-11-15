import { View, Text, Modal, Button, Alert, ScrollView } from "react-native";
import TableComponent from "../../../../components/Tables/TableComponent";
import React, { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import moment from "moment";
import { UserClassesDTO } from "../../../../core/dtos/UserClassesDTO";
import { TableDataModel } from "../../../../core/models/TableDataModel";
import { ScheduledRollHistoryDTO } from "../../../../core/dtos/ScheduledRollHistoryDTO";
import { LocationAccuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync, LocationObject } from "expo-location";
import * as geolib from 'geolib';
import MapView, { Marker } from "react-native-maps";
import { styles } from "../../../../../styles";

export type StackParamList = {
    Class: { userClass: UserClassesDTO};
}

export default function ManageCallsScreen({ route }: NativeStackScreenProps<StackParamList, 'Class'>) {

    const { userClass } = route.params

    const [scheduledRollHistory, setScheduledRollHistory] = useState<TableDataModel[][]>();

    const handleCreateScheduledRoll = () => {

        const createScheduledRoll = async () => {
            try {
                const response = await axios.post<ScheduledRollHistoryDTO>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendanceRoll`, 
                    {
                        id_class: userClass.id_class,
                        start_datetime: date.dateStart,
                        end_datetime: date.dateEnd,
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude
                    },
                );

                const scheduledRoll : ScheduledRollHistoryDTO | undefined = response?.data;

                const historyItem = [
                    {text: scheduledRoll.id_attendance_roll.toString(), removeLine: true, action: undefined},
                    {text: new Date(scheduledRoll.start_datetime).toLocaleDateString(), action: undefined},
                    {text: moment(scheduledRoll.start_datetime).format('LT'), action: undefined},
                    {text: moment(scheduledRoll.end_datetime).format('LT'), action: undefined},
                    {text: 'EXCLUIR', action: () => {excludeCallAlert(scheduledRoll.id_attendance_roll)}}
                ];

                setScheduledRollHistory((prevstate) => {
                    const newState = prevstate ? [...prevstate] : [];
                    newState?.push(historyItem);
                    return newState;
                });

            } catch (error) {
                console.log(error);
            };
        };
        
        setModalVisible(!modalVisible);

        createScheduledRoll();
    }

    const [modalVisible, setModalVisible] = useState(false)

    const [showMap, setShowMap] = useState(false);

    const onShowMapChange = () => {
        setShowMap(!showMap);
    }

    const [location, setLocation] = useState<LocationObject | null>(null);

    const [date, setDate] = useState({
        dateStart: new Date(),
        dateEnd: new Date()
    });

    const [mode, setMode] = useState<'date' | 'time'>('date');

    const [show, setShow] = useState({
        showDatePicker: false,
        showEndTimePicker: false,
        showStartTimePicker: false,
    });
  
    const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        let year = selectedDate?.getFullYear();
        let month = selectedDate?.getMonth()! + 1;
        let day = selectedDate?.getDate();
        
        const dateString = '' + year + '-' + month + '-' + day;
        const timeString = new Date().getHours() + ':' + new Date().getMinutes() + ':00';

        setShow({
            showEndTimePicker: false,
            showStartTimePicker: false,
            showDatePicker: false,
        });
        setDate({
            dateStart: new Date(dateString + ' ' + timeString),
            dateEnd: new Date(dateString + ' ' + timeString)
        });
    };

    const onTimeEndChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        setShow({
            showEndTimePicker: false,
            showStartTimePicker: false,
            showDatePicker: false,
        });
        setDate({
            ...date,
            dateEnd: currentDate!
        });
    };

    const onTimeStartChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        setShow({
            showEndTimePicker: false,
            showStartTimePicker: false,
            showDatePicker: false,
        });
        setDate({
            ...date,
            dateStart: currentDate!
        });
    };
  
    const showMode = (currentMode: 'date' | 'time', range : 'start' | 'end') => {
        
        if(range === 'start') {
            currentMode === 'date' ? setShow({
                showEndTimePicker: false,
                showStartTimePicker: false,
                showDatePicker: true,
            }) : setShow({
                showEndTimePicker: false,
                showStartTimePicker: true,
                showDatePicker: false,
            })

        } else {
            setShow({
                showEndTimePicker: true,
                showStartTimePicker: false,
                showDatePicker: false,
            })
        }
        setMode(currentMode);
    };
  
    const showDatepicker = (range : 'start' | 'end') => {
        showMode('date', range);
    };
  
    const showTimepicker = (range : 'start' | 'end') => {
        showMode('time', range);
    };

    const excludeCallAlert = (attendence_id: number) =>
    Alert.alert('EXCLUIR CHAMADA', 'Tem certeza que quer excluir a chamada?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {

        const deleteAttendenceRoll = async () => {
            try {
                const response = await axios.delete(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendanceRoll/${attendence_id}`);

                setScheduledRollHistory((prevScheduledRollHistory) => {
                    const newScheduledRollHistory = prevScheduledRollHistory?.filter((item) => {
                        const id_attendance_roll = parseInt(item[0].text);
                        return id_attendance_roll !== attendence_id;
                    });
                    return newScheduledRollHistory;
                });

            } catch (error) {
                console.log(error);
            };
        }

        deleteAttendenceRoll();
      }},
    ]);

    useEffect(() => {
        async function requestLocationPermissionsAsync() {
            const { granted } = await requestForegroundPermissionsAsync();
    
            if(!granted) {
                Alert.alert("Permissão de localização", "Para utilizar o aplicativo é necessário permitir o acesso a localização.");
            } else {
                const location = await getCurrentPositionAsync();
    
                setLocation(location);
            }
        }
        
        requestLocationPermissionsAsync();
    }, []);

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (location) => {
            setLocation(location);
        })
    }, []);

    useEffect(() => {

        const fetchScheduledRollHistory = async () => {
            try {
                const response = await axios.get<ScheduledRollHistoryDTO[]>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/attendanceRoll/upcoming/${userClass.id_class}`);

                const userAttendanceRollHistory : ScheduledRollHistoryDTO[] | undefined = response?.data;

                const history : TableDataModel[][] = [
                    [{text: 'DATA', action: undefined}, {text: 'HORÁRIO INÍCIO', action: undefined}, {text: 'HORÁRIO FIM', action: undefined}, {text: '', action: undefined}],
                ];

                userAttendanceRollHistory?.forEach(attendance => {
                        const historyItem = [
                            {text: attendance.id_attendance_roll.toString(), removeLine: true, action: undefined},
                            {text: new Date(attendance.start_datetime).toLocaleDateString(), action: undefined},
                            {text: moment(attendance.start_datetime).format('LT'), action: undefined},
                            {text: moment(attendance.end_datetime).format('LT'), action: undefined},
                            {text: 'EXCLUIR', action: () => {excludeCallAlert(attendance.id_attendance_roll)}}
                        ];
    
                        history.push(historyItem || []);
                });

                setScheduledRollHistory(history);

            } catch (error) {
                console.log(error);
            };
        }
    
        fetchScheduledRollHistory();
        
    }, [userClass.id_class]);

    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} className="flex-col py-2 px-4 w-full mt-2 overflow-auto h-full">
            <View className="divide-gray-500 divide-y">
                <Text className="text-xl py-1">Chamadas Agendadas</Text>

                <View className="self-center mt-4 pt-6">
                    <TableComponent tableData={scheduledRollHistory} />
                </View>
            </View>

            <View className="flex-col mb-8">
                <View className="mb-2">
                    <Button title="AGENDAR NOVA CHAMADA" color='green' onPress={() => {
                        setModalVisible(!modalVisible);
                    }} />             
                </View>
            </View>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                <View className="flex-col justify-between h-full py-2 px-4 w-full mt-2 overflow-y-auto">

                    <ScrollView className="divide-gray-500 divide-y mt-4">

                        <Text className="text-xl p-2">Definir data e horários de agendamento</Text>

                        <View className="mt-4 pt-4 divide-gray-300 divide-y">
                            <View className="mb-4">
                                <View className="flex-row items-center justify-evenly mb-4">
                                    <View className="w-1/2 flex-col mb-2">
                                        <Text className="text-base text-center my-4">Definir data e redefinir horários:</Text>
                                        <Button title="DATA" color='blue' onPress={() => {showDatepicker('start');}} />
                                    </View>
                                </View>
                                {show.showDatePicker && (
                                    <DateTimePicker
                                    testID="datePicker"
                                    value={date.dateStart}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onDateChange}
                                    />
                                )}
                            </View>

                            <View className="mb-4">
                                <View className="flex-row items-center justify-evenly mb-4">
                                    <View className="w-1/2 flex-col mb-2">
                                        <Text className="text-base text-center my-4">Definir horário inicial:</Text>
                                        <Button title="INÍCIO" color='blue' onPress={() => {showTimepicker('start');}} />
                                    </View>
                                </View>
                                {show.showStartTimePicker && (
                                    <DateTimePicker
                                    testID="startTimePicker"
                                    value={date.dateStart}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onTimeStartChange}
                                    />
                                )}
                            </View>

                            <View className="mb-4">
                                <View className="flex-row items-center justify-evenly mb-4">
                                    <View className="w-1/2 flex-col mb-8">
                                        <Text className="text-base text-center my-4">Definir horário final:</Text>
                                        <Button title="FIM" color='blue' onPress={() => {showTimepicker('end');}} />
                                    </View>
                                </View>
                                <View className="text-lg flex-col items-center justify-center">
                                    <Text className="text-lg font-bold mb-2">Data e horário de início:</Text>
                                    <Text className="mb-4 text-base">{date.dateStart.toLocaleString()}</Text>

                                    <Text className="text-lg font-bold mb-2">Data e horário de fim:</Text>
                                    <Text className="mb-4 text-base">{date.dateEnd.toLocaleString()}</Text>
                                </View>
                                {show.showEndTimePicker && (
                                    <DateTimePicker
                                    testID="endTimePicker"
                                    value={date.dateEnd}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onTimeEndChange}
                                    />
                                )}
                            </View>
                        </View>

                        <View>
                            <View className="flex-row items-center justify-evenly mb-4">
                                <View className="w-1/2 flex-col mb-2">
                                    <Text className="text-base text-center my-4">Definir localização:</Text>
                                    <Button title="LOCALIZAÇÃO" color='blue' onPress={onShowMapChange} />
                                </View>
                            </View>
                            <View className="text-lg flex-col items-center justify-center">
                                <Text className="text-lg font-bold mb-2">Latitude:</Text>
                                <Text className="mb-4 text-base">{location?.coords.latitude}</Text>

                                <Text className="text-lg font-bold mb-2">Longitude:</Text>
                                <Text className="mb-4 text-base">{location?.coords.longitude}</Text>
                            </View>
                        </View>

                        {
                            (showMap && location) &&
                            <MapView 
                                style={styles.map}
                                initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005,
                                }}
                            >
                                <Marker 
                                    coordinate= {{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude
                                    }}                                        
                                />
                            </MapView>
                        }
                    </ScrollView>

                    <View className="flex-col mb-8 mt-2">
                        <View className="mb-2">
                            <Button title="CONFIRMAR" color='green' onPress={handleCreateScheduledRoll} />
                        </View>
                        <Button title={
                            showMap ? "VOLTAR" : "CANCELAR"
                        } color='red' onPress={() => {
                            if(showMap) {
                                setShowMap(!showMap);
                            } else {
                                setModalVisible(!modalVisible);
                            }
                        }} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}