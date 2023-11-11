import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableWithoutFeedback } from "react-native";
import { View, Text } from "react-native";
import { UserClassesDTO } from "../../core/dtos/UserClassesDTO";
import { Icon } from "react-native-elements";

interface ClassCardComponentProps {
    userClass: UserClassesDTO;
    staticMode?: boolean;
    schedule?: Date;
    iconActionButton?: ()=>void;
}

export default function ClassCardComponent({userClass, staticMode, schedule, iconActionButton}: ClassCardComponentProps) {

    const navigation = useNavigation<StackNavigationProp<any>>();
    
    return (
        <TouchableWithoutFeedback onPress={staticMode ? undefined : () => navigation.navigate('Turma', {userClass: userClass})} >
            <View className="h-24 flex flex-col px-3 py-2 border border-gray-400 rounded mb-3 bg-blue-600">
                <View className="flex-row justify-between">
                    <View className='w-4/5'>
                        <Text className="text-white text-lg">{userClass.code + " - " + userClass.name}</Text>
                    </View>
                    {iconActionButton? <Icon className="" name="groups" size={20} color={'#fff'} onPress={iconActionButton} /> : null }
                </View>
                <Text className="text-white mb-2">{userClass.semester}</Text>
                {staticMode ? 
                <Text className="text-white">{schedule?.toString()}</Text>
                : null}
            </View>
        </TouchableWithoutFeedback>
        
    )
}