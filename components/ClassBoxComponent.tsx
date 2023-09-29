import { View, Text } from "react-native";

interface ClassBoxComponentProps {
    codigoTurma: string;
    nomeTurma: string;
    semestre: string;
}

export default function ClassBoxComponent({codigoTurma, nomeTurma, semestre}: ClassBoxComponentProps) {
    return (
        <View className="flex flex-col px-3 py-5 border border-gray-400 rounded mb-3">
            <View className="flex-row mb-2">
                <Text>{codigoTurma + " - "}</Text>
                <Text>{nomeTurma}</Text>
            </View>
            <Text>{semestre}</Text>
        </View>
    )
}