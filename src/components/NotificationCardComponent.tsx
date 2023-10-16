import { View, Text } from "react-native";

interface NotificationCardComponentProps {
    title: string;
    content: string;
}




export default function NotificationCardComponent({title,content} : NotificationCardComponentProps){

    return(
        <View className="flex-col px-4 py-2 rounded mb-6 bg-white shadow-md shadow-black">
            <Text className="text-xl mb-2">{title}</Text>
            <Text className="mb-1 text-justify">{content}</Text>
        </View>
    )
}