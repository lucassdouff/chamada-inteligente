import { View, Text, Modal, Button, Alert } from "react-native";
import TableComponent from "../../../../components/Tables/TableComponent";
import ButtonComponent from "../../../../components/Buttons/ButtonComponent";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ListComponent from "../../../../components/Lists/ListComponent";

export default function ManageCallsScreen() {

    const [modalsVisible, setModalsVisible] = useState({
        scheduleCallModal: false,
        startCallModal: false
    })

    const [date, setDate] = useState({
        dateStart: new Date(),
        dateEnd: new Date()
    });
    const [mode, setMode] = useState<'date' | 'time'>('date');
    const [show, setShow] = useState({
        showStartPicker: false,
        showEndPicker: false,
    });
  
    const onStartChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        setShow({
            showStartPicker: false,
            showEndPicker: false,
        });
        setDate({
            ...date,
            dateStart: currentDate!
        });
    };

    const onEndChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        setShow({
            showStartPicker: false,
            showEndPicker: false,
        });
        setDate({
            ...date,
            dateEnd: currentDate!
        });
    };
  
    const showMode = (currentMode: 'date' | 'time', range : 'start' | 'end') => {
        range === 'start' ? setShow({
            showStartPicker: true,
            showEndPicker: false,
        }) : setShow({
            showEndPicker: true,
            showStartPicker: false,
        })
        setMode(currentMode);
    };
  
    const showDatepicker = (range : 'start' | 'end') => {
        showMode('date', range);
    };
  
    const showTimepicker = (range : 'start' | 'end') => {
        showMode('time', range);
    };

    const excludeCallAlert = () =>
    Alert.alert('EXCLUIR CHAMADA', 'Tem certeza que quer excluir a chamada?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

    const startCallAlert = () =>
    Alert.alert('INICIAR CHAMADA', 'Tem certeza que quer iniciar uma chamada?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        setModalsVisible({
            ...modalsVisible,
            startCallModal: !modalsVisible.startCallModal
        });
      }},
    ]);


    return(
        <View className="flex-col py-2 px-4 w-full mt-2 overflow-auto h-full justify-between">
            <View className="divide-gray-500 divide-y">
                <Text className="text-xl py-1">Chamadas Agendadas</Text>

                <View className="self-center mt-4 pt-6">
                    <TableComponent tableData={[
                        [{text: 'DATA', action: undefined}, {text: 'HORÁRIO INÍCIO', action: undefined}, {text: 'HORÁRIO FIM', action: undefined}, {text: '', action: undefined}],
                        [{text: '17/10/2023', action: undefined}, {text: '7:00', action: undefined}, {text: '9:00', action: undefined}, {text: 'EXCLUIR', action: excludeCallAlert}],
                        [{text: '19/10/2023', action: undefined}, {text: '7:00', action: undefined}, {text: '9:00', action: undefined}, {text: 'EXCLUIR', action: excludeCallAlert}],
                        ]} 
                    />
                </View>
            </View>

            <View className="flex-col mb-8">
                <View className="mb-2">
                    <ButtonComponent action={startCallAlert} color={"blue"} title={"INICIAR CHAMADA"} />
                </View>
                <ButtonComponent action={() => {
                    setModalsVisible({
                        ...modalsVisible,
                        scheduleCallModal: !modalsVisible.scheduleCallModal
                    });
                }} color={"green"} title={"AGENDAR CHAMADA"} />
            </View>

            <Modal
                animationType="slide"
                visible={modalsVisible.scheduleCallModal}
                onRequestClose={() => {
                setModalsVisible({
                    ...modalsVisible,
                    scheduleCallModal: !modalsVisible.scheduleCallModal
                });
                }}>
                <View className="flex-col justify-between h-full py-2 px-4 w-full mt-2 overflow-y-auto">

                    <SafeAreaView className="divide-gray-500 divide-y mt-4">

                        <Text className="text-xl p-2">Definir data/horário de agendamento</Text>

                        <View className="mt-4 pt-8 divide-gray-300 divide-y">
                            <View className="mb-8">
                                <View className="flex-row items-center justify-evenly mb-4">
                                    <View className="w-1/2 flex-col mb-4 mr-4">
                                        <Text className="text-base text-center mb-4">Definir data inicial:</Text>
                                        <ButtonComponent action={() => {
                                            showDatepicker('start');
                                        }} color={"blue"} title={"DATA INÍCIO"} />
                                    </View>
                                    <View className="w-1/2 flex-col mb-4">
                                        <Text className="text-base text-center mb-4">Definir horário inicial:</Text>
                                        <ButtonComponent action={() => {
                                            showTimepicker('start');
                                        }} color={"blue"} title={"HORÁRIO INÍCIO"} />
                                    </View>
                                </View>
                                <Text className="text-lg self-center text-center"><Text className="text-lg font-bold">Data/Horário início:</Text> {date.dateStart.toLocaleString()}</Text>
                                {show.showStartPicker && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date.dateStart}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onStartChange}
                                    />
                                )}
                            </View>

                            <View className="pt-8">
                                <View className="flex-row items-center justify-evenly mb-4">
                                    <View className="w-1/2 flex-col mb-4 mr-4">
                                        <Text className="text-base text-center mb-4">Definir data final:</Text>
                                        <ButtonComponent action={() => {
                                            showDatepicker('end');
                                        }} color={"blue"} title={"DATA FIM"} />
                                    </View>
                                    <View className="w-1/2 flex-col mb-4">
                                        <Text className="text-base text-center mb-4">Definir horário final:</Text>
                                        <ButtonComponent action={() => {
                                            showTimepicker('end');
                                        }} color={"blue"} title={"HORÁRIO FIM"} />
                                    </View>
                                </View>
                                <Text className="text-lg self-center text-center"><Text className="text-lg font-bold">Data/Horário fim:</Text> {date.dateEnd.toLocaleString()}</Text>
                                {show.showEndPicker && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date.dateEnd}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onEndChange}
                                    />
                                )}
                            </View>
                        </View>
                    </SafeAreaView>

                    <View className="flex-col mb-8">
                        <View className="mb-2">
                            <ButtonComponent action={() => {}} color={"green"} title={"CONFIRMAR"} />
                        </View>
                        <ButtonComponent action={() => {
                            setModalsVisible({
                                ...modalsVisible,
                                scheduleCallModal: !modalsVisible.scheduleCallModal
                            });
                        }} color={"red"} title={"CANCELAR"} />
                    </View>
                </View>
            </Modal>

            <Modal 
                animationType="slide"
                visible={modalsVisible.startCallModal}
                onRequestClose={() => {
                setModalsVisible({
                    ...modalsVisible,
                    startCallModal: !modalsVisible.startCallModal
                });
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

                        <View className="mb-8">
                            <ButtonComponent action={() => {
                                setModalsVisible({
                                    ...modalsVisible,
                                    startCallModal: !modalsVisible.startCallModal
                                });
                            }}  color={"red"} title={"ENCERRAR CHAMADA"}                
                            />
                        </View>
                    </View>
            </Modal>
        </View>
    )
}