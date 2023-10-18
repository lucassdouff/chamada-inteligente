import { View } from "react-native";
import ListComponent from "../../../../components/Lists/ListComponent";

export default function ManageClassScreen() {
    return (
        <View className="flex-col py-2 px-4 w-full mt-2 overflow-auto">
            <View className="mb-6">
                <ListComponent listType={"teacher"} listData={[
                    {
                        name: 'Roberto Carlos',
                    }
                ]} />
            </View>

            <ListComponent listType={"student"} listData={[
                {
                    name: 'Roberto Carlos Filho',
                    info: {
                        percent: 44,
                    }
                },
                {
                    name: 'Roberto Carlos Filho Júnior',
                    info: {
                        percent: 75,
                    }
                }
            ]} />
        </View>
    )
}