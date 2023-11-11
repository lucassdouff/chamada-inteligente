import { View } from "react-native";
import ListComponent from "../../../../components/Lists/ListComponent";

export default function ManageClassScreen() {
    return (
        <View className="flex-col py-2 px-4 w-full mt-2 overflow-auto">
            <View className="mb-6">
                <ListComponent listType={"teacher"} listData={[
                    {
                        id: 1,
                        name: 'Roberto Carlos',
                    }
                ]} />
            </View>

            <ListComponent listType={"student"} listData={[
                {
                    id: 1,
                    name: 'Roberto Carlos Filho',
                    info: {
                        description: '75',
                    }
                },
                {
                    id: 2,
                    name: 'Roberto Carlos Filho Júnior',
                    info: {
                        description: '45',
                    }
                }
            ]} />
        </View>
    )
}