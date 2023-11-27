import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableWithoutFeedback } from "react-native";
import { View, Text } from "react-native";
import { UserClassesDTO } from "../../core/dtos/UserClassesDTO";
import { Icon } from "react-native-elements";
import { ClassWeekDayModel } from "../../core/models/ClassWeekDayModel";
import moment from "moment";

interface ClassCardComponentProps {
    userClass: UserClassesDTO;
    staticMode?: boolean;
    schedule?: ClassWeekDayModel[];
    iconActionButton?: ()=>void;
}

export default function ClassCardComponent({userClass, staticMode, schedule, iconActionButton}: ClassCardComponentProps) {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const formatWeekDays = (weekDays: ClassWeekDayModel) => {
        let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        let result = '';

        result += days[weekDays.weekday];

        result += moment(weekDays.start_hour, 'HH:mm:ss').format(' - HH:mm');
        result += ' às ';
        result += moment(weekDays.end_hour, 'HH:mm:ss').format('HH:mm');

        return result;
    }
    
    return (
        <TouchableWithoutFeedback onPress={staticMode ? undefined : () => navigation.navigate('Turma', {userClass: userClass})} >
            <View className="h-24 flex flex-col px-3 py-2 border border-gray-400 rounded mb-3 bg-blue-600">
                <View className="flex-row justify-between">
                    <View className='w-4/5'>
                        <Text className="text-white text-lg">{userClass.code + " - " + userClass.name}</Text>
                    </View>
                    {iconActionButton? <Icon name="groups" size={20} color={'#fff'} onPress={iconActionButton} /> : null }
                </View>
                <Text className="text-white mb-2">{userClass.semester}</Text>
                {staticMode ?
                    <View className="flex-row">
                        {
                            schedule?.map((item, index) => {
                                return(
                                    <Text key={index} className="text-white">{formatWeekDays(item)} 
                                        {index < schedule.length - 1 ? ', ' : ''}
                                    </Text>
                                )
                            })
                        }
                    </View> 
                : null}
            </View>
        </TouchableWithoutFeedback>
        
    )
}