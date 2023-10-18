import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableWithoutFeedback } from "react-native";
import { View, Text } from "react-native";

interface ClassBoxComponentProps {
    codigoTurma: string;
    nomeTurma: string;
    semestre: string;
    extraInfo?: string;
}

export default function ClassBoxComponent({codigoTurma, nomeTurma, semestre, extraInfo}: ClassBoxComponentProps) {

    const navigation = useNavigation<StackNavigationProp<any>>();
    
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Turma')} >
            <View className="h-24 flex flex-col px-3 py-2 border border-gray-400 rounded mb-3 bg-blue-600">
                <View className="flex-row">
                    <Text className="text-white text-lg">{codigoTurma + " - "}</Text>
                    <Text className="text-white text-lg">{nomeTurma}</Text>
                </View>
                <Text className="text-white mb-2">{semestre}</Text>
                {extraInfo ? 
                <Text className="text-white">{extraInfo}</Text>
                : null}
            </View>
        </TouchableWithoutFeedback>
        
    )
}