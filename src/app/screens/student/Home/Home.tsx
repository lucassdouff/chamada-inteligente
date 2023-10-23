import { View } from "react-native";
import ClassCardComponent from "../../../../components/Cards/ClassCardComponent";

export default function HomeScreen() {
    return(
        <View className="py-2 px-4 w-full mt-2">
            <ClassCardComponent 
                codigoTurma="TCC00315"
                nomeTurma="Laboratório"
                semestre="2023/2"
            />
            <ClassCardComponent 
                codigoTurma="TCC00315"
                nomeTurma="Laboratório"
                semestre="2023/2"
            />
            <ClassCardComponent 
                codigoTurma="TCC00315"
                nomeTurma="Laboratório"
                semestre="2023/2"
            />
        </View>
    );
}