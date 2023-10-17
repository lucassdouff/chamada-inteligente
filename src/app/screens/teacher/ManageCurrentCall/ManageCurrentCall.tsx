import { View } from "react-native";
import ListComponent from "../../../../components/ListComponent";
import ButtonComponent from "../../../../components/ButtonComponent";

export default function ManageCurrentCallScreen() {
    return(
        <View className="flex-col justify-between h-full py-2 px-4 w-full mt-2 overflow-auto">
            <ListComponent listType={"student"} listData={[
                {
                    name: 'Roberto Carlos Filho',
                    info: {
                        present: true,
                        action: () => {}
                    }
                },
                {
                    name: 'Roberto Carlos Filho Júnior',
                    info: {
                        present: false,
                        action: () => {}
                    }
                }
            ]} />

            <View className="mb-8">
                <ButtonComponent action={() => {}} color={"red"} title={"ENCERRAR CHAMADA"}                
                />
            </View>
        </View>
    )
}