import { View, Text } from "react-native";
import ButtonComponent from "../../../../components/Buttons/ButtonComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type StackParamList = {
    Class: { classID: string};
}

export default function ManageClassScreen({ route, navigation }: NativeStackScreenProps<StackParamList, 'Class'>) {

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
                    
                    <ButtonComponent action={() => {}} color={"blue"} title={"SOLICITAR"} />
                </View>
            </View>
        </View>
    )
}