import { Text, TouchableHighlight, View } from "react-native";

interface ButtonComponentProps {
    action: () => void;
    disabled?: true | false;
    color: string;
    title: string;
}

export default function ButtonComponent({action, disabled, color, title}: ButtonComponentProps) {

    let btnColor = '';

    switch(color) {
        case 'blue':
            btnColor = ' bg-blue-600';
            break;
        case 'yellow':
            btnColor = ' bg-yellow-400';
            break;
        case 'red':
            btnColor = ' bg-red-600';
            break;
        case 'green':
            btnColor = ' bg-emerald-500';
            break;
        default:
            break;
    }

    if(disabled) {
        btnColor = ' bg-gray-500';
    }

    return (
        <TouchableHighlight disabled={disabled} onPress={action}>
            <View className={'w-full flex items-center px-3 py-2 rounded-sm' + btnColor}>
                <Text className="text-white text-base">{title}</Text>
            </View>
        </TouchableHighlight>
    )
}
