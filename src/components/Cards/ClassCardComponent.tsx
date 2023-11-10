import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableWithoutFeedback } from "react-native";
import { View, Text } from "react-native";
import { UserClassesDTO } from "../../core/dtos/UserClassesDTO";

interface ClassCardComponentProps {
    userClass: UserClassesDTO;
    staticMode?: boolean;
    schedule?: Date;
}

export default function ClassCardComponent({userClass, staticMode, schedule}: ClassCardComponentProps) {

    const navigation = useNavigation<StackNavigationProp<any>>();
    
    return (
        <TouchableWithoutFeedback onPress={staticMode ? undefined : () => navigation.navigate('Turma', {userClass: userClass})} >
            <View className="h-24 flex flex-col px-3 py-2 border border-gray-400 rounded mb-3 bg-blue-600">
                <View className="flex-row">
                    <Text className="text-white text-lg">{userClass.code + " - "}</Text>
                    <Text className="text-white text-lg">{userClass.name}</Text>
                </View>
                <Text className="text-white mb-2">{userClass.semester}</Text>
                {staticMode ? 
                <Text className="text-white">{schedule?.toString()}</Text>
                : null}
            </View>
        </TouchableWithoutFeedback>
        
    )
}