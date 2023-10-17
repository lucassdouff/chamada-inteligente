import { View, Text } from "react-native";
import TableComponent from "../../../../components/TableComponent";
import ButtonComponent from "../../../../components/ButtonComponent";

export default function ManageCallsScreen() {
    return(
        <View className="flex-col py-2 px-4 w-full mt-2 overflow-auto h-full justify-between">
            <View className="divide-gray-500 divide-y">
                <Text className="text-xl py-1">Chamadas Agendadas</Text>

                <View className="self-center mt-4 pt-8">
                    <TableComponent tableData={[
                        [{text: 'DATA', action: undefined}, {text: 'HORÁRIO INÍCIO', action: undefined}, {text: 'HORÁRIO FIM', action: undefined}, {text: '', action: undefined}],
                        [{text: '17/10/2023', action: undefined}, {text: '7:00', action: undefined}, {text: '9:00', action: undefined}, {text: 'EXCLUIR CHAMADA', action: () => {}}],
                        [{text: '19/10/2023', action: undefined}, {text: '7:00', action: undefined}, {text: '9:00', action: undefined}, {text: 'EXCLUIR CHAMADA', action: () => {}}],
                        ]} 
                    />
                </View>
            </View>

            <View className="flex-col mb-8">
                <View className="mb-2">
                    <ButtonComponent action={() => {}} color={"blue"} title={"INICIAR CHAMADA"} />
                </View>
                <ButtonComponent action={() => {}} color={"green"} title={"AGENDAR CHAMADA"} />
            </View>
        </View>
    )
}