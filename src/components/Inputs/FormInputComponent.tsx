import { Text, TextInput, View } from "react-native";

interface FormInputComponentProps {
    label: string;
    placeholder?: string;
}

export default function FormInputComponent({ label, placeholder }: FormInputComponentProps) {
    return(
        <View className="flex gap-2 mb-6">
            <Text>{label}</Text>
            <TextInput underlineColorAndroid="transparent" className="px-2 py-0.5 border border-gray-400 rounded" placeholder={placeholder} />
        </View>
    )
} 