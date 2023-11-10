import { View, Text, Modal, SafeAreaView, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export type StackParamList = {
    Class: { classID: string};
}

export default function ManageClassScreen({ route }: NativeStackScreenProps<StackParamList, 'Class'>) {

    const [modalVisible, setModalVisible] = useState(false);


    const { classID } = route.params
    console.log(classID);

    return(
        <View className="flex-col py-2 px-4 w-full mt-2 overflow-y-auto h-full">
            <View className="divide-gray-500 divide-y">
                <Text className="text-xl px-2 py-1 mb-4">Aula do dia 22/09/2023</Text>

                <View className="flex-col py-4">
                    <View className="flex-col gap-4 p-2">
                        <View className="flex-row justify-between">
                            <Text>Presença:</Text>
                            <Text>Ausente</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text>Tempo de presença:</Text>
                            <Text>N/A</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-col items-center justify-start h-full">
                    <Text className="text-xl px-2 py-5 self-start">Processo de abonação de falta</Text>
                    
                    <Button title="SOLICITAR" onPress={() => {setModalVisible(!modalVisible);}} color="blue" />
                </View>
            </View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                <View className="flex-col justify-between h-full py-2 px-4 w-full mt-2 overflow-y-auto">

                    <View className="divide-gray-500 divide-y">
                        <Text className="text-xl px-2 py-1 mb-4">Preencha os campos abaixo</Text>
                        <View className="py-4">
                            <View className='py-4 flex-col mb-4'>
                                <Text className="text-base mb-4">ANEXAR ATESTADO MÉDICO (PDF):</Text>
                                <View className='self-start'>
                                    <Button title="ANEXAR ARQUIVO" onPress={() => {}} color="blue" />
                                </View>
                            </View>
                            <View>
                                <Text className="text-base mb-4">COMENTÁRIOS:</Text>
                                <TextInput
                                    multiline
                                    numberOfLines={6}
                                    placeholder="Digite alguma observação..."
                                    style={{textAlignVertical:"top"}}
                                    className="bg-gray-100 p-2"
                                /> 
                            </View>
                            
                        </View>
                    </View>
                    <View className="flex-col mb-8">
                        <View className="mb-2">
                            <Button title="CONFIRMAR" onPress={() => {}} color="green" />
                        </View>
                        <Button title="CANCELAR" onPress={() => {setModalVisible(!modalVisible);}} color="red" />
                    </View>
                </View>
            </Modal>
        </View>
    )
}