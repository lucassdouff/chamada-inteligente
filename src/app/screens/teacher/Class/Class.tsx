import { Text, View } from "react-native";
import ButtonComponent from "../../../../components/ButtonComponent";
import ClassBoxComponent from "../../../../components/ClassBoxComponent";
import TableComponent from "../../../../components/TableComponent";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export default function ClassScreen() {
    
    const navigation = useNavigation<StackNavigationProp<any>>();

    return(
        <View className="flex-col py-2 px-4 w-full mt-2 divide-gray-500 divide-y overflow-auto">
            <View className="mb-6">
                <ClassBoxComponent codigoTurma={"TCC00315"} nomeTurma={"Laboratório"} semestre={"2023/2"} extraInfo={"2as de 7:00 às 9:00 e 4as de 9:00 às 11:00"} />

                <View className="self-center w-3/4 mt-2">
                    <ButtonComponent action={() => {
                        navigation.navigate('Gerenciar Chamadas');
                    }} color={"blue"} title={"GERENCIAR CHAMADAS"} />
                </View>
            </View>

            <View className="flex-col mb-6">
                <Text className="my-4 text-xl">Informações da Turma</Text>
                <View className="flex-col gap-4 p-2">
                    <View className="flex-row justify-between">
                        <Text>Total de alunos inscritos:</Text>
                        <Text>23</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Média de frequência dos alunos:</Text>
                        <Text>60%</Text>
                    </View>
                </View>
                <View className="self-center mt-4">
                    <ButtonComponent action={() => {
                        navigation.navigate('Gerenciar Turma');
                    }} color={"blue"} title={"GERENCIAR TURMA"} />
                </View>
            </View>

            <View className="flex-col">
                <Text className="my-4 text-xl">Histórico de chamadas</Text>
                <View className="self-center">
                    <TableComponent tableData={[
                        [{text: 'DATA', action: undefined}, {text: 'HORÁRIO', action: undefined}, {text: 'ALUNOS PRESENTES', action: undefined}, {text: 'MÉDIA DE PRESENÇA', action: undefined}, {text: '', action: undefined}],
                        [{text: '17/10/2023', action: undefined}, {text: '7:00-9:00', action: undefined}, {text: '20', action: undefined}, {text: '40 min', action: undefined}, {text: 'EXPORTAR CHAMADA', action: () => {}}],
                        [{text: '19/10/2023', action: undefined}, {text: '7:00-9:00', action: undefined}, {text: '13', action: undefined}, {text: '33 min', action: undefined}, {text: 'EXPORTAR CHAMADA', action: () => {}}],
                        ]} 
                    />
                </View>
            </View>
        </View>
    );
}