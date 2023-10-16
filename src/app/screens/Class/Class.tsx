import { Button, Text, View } from "react-native";
import ButtonComponent from "../../../components/ButtonComponent";

export default function ClassScreen() {
    return(
        <View className="flex-col gap-4 justify-center px-3 py-5">
            <View>
                <Text>Laboratório</Text>
                <Text>TCC00315</Text>
                <Text>2023/2 - Segunda feira, de 16 as 19</Text>
            </View>
            <View className="mb-4">
                <Text>Número total de faltas na disciplina: 10</Text>
                <Text>Percentual de faltas na disciplina: 30%</Text>
                <Text>Tempo médio que esteve presente na disciplina: 45min</Text>
            </View>
            <View className="w-full self-center">
                <ButtonComponent action={() => {}} color='blue' title={"INDICAR PRESENÇA"}                    
                />
            </View>
        </View>
    );
}