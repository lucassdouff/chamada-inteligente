import { View, Text } from "react-native";
import ClassCardComponent from "../../../../components/Cards/ClassCardComponent";
import ButtonComponent from "../../../../components/Buttons/ButtonComponent";
import TableComponent from "../../../../components/Tables/TableComponent";

export default function ClassScreen() {
    return(
        <View className="flex-col py-2 px-4 w-full mt-2 divide-gray-500 divide-y overflow-auto">
            <View className="mb-6">
                <ClassCardComponent codigoTurma={"TCC00315"} nomeTurma={"Laboratório"} semestre={"2023/2"} staticMode additionalInfo={"2as de 7:00 às 9:00 e 4as de 9:00 às 11:00"} />

                <View className="self-center w-3/4 mt-2">
                    <ButtonComponent action={() => {}} color={"blue"} title={"INDICAR PRESENÇA"} />
                </View>
            </View>

            <View className="flex-col mb-6">
                <Text className="my-4 text-xl">Informações do Aluno</Text>
                <View className="flex-col gap-4 p-2">
                    <View className="flex-row justify-between">
                        <Text>Total de faltas:</Text>
                        <Text>1</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Percentual de faltas:</Text>
                        <Text>20%</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Tempo médio de presença:</Text>
                        <Text>40 min</Text>
                    </View>
                </View>
            </View>

            <View className="flex-col">
                <Text className="my-4 text-xl">Histórico de aulas</Text>
                <View className="self-center">
                    <TableComponent tableData={[
                        [{text: 'DATA', action: undefined}, {text: 'HORÁRIO', action: undefined}, {text: 'PRESENÇA', action: undefined}, {text: '', action: undefined}],
                        [{text: '17/10/2023', action: undefined}, {text: '7:00-9:00', action: undefined}, {text: 'PRESENTE', action: undefined}, {text: 'CONSULTAR', action: () => {}}],
                        [{text: '19/10/2023', action: undefined}, {text: '7:00-9:00', action: undefined}, {text: 'AUSENTE', action: undefined}, {text: 'CONSULTAR', action: () => {}}]
                        ]} 
                    />
                </View>
            </View>
        </View>
    );
}