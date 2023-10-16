import { TouchableHighlight } from "react-native-gesture-handler";
import { View } from "react-native";
import { Icon } from "react-native-elements";

interface AddElementButtonProps {
    action: () => void;
}

export default function AddElementButton({action}: AddElementButtonProps) {
    return (
        <TouchableHighlight onPress={action}>
            <View className="w-full py-1 px-3 bg-blue-600 rounded-sm">
                <Icon name="add" color={"white"} />
            </View>
        </TouchableHighlight>
    )
}