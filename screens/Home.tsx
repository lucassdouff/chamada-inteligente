import { View } from "react-native";
import ClassBoxComponent from "../components/ClassBoxComponent";

export default function HomeScreen() {
    return(
        <View className="w-full py-2 px-4 mt-2">
            <ClassBoxComponent 
                codigoTurma="TCC00315"
                nomeTurma="Laboratório"
                semestre="2023/2"
            />
            <ClassBoxComponent 
                codigoTurma="TCC00315"
                nomeTurma="Laboratório"
                semestre="2023/2"
            />
            <ClassBoxComponent 
                codigoTurma="TCC00315"
                nomeTurma="Laboratório"
                semestre="2023/2"
            />
        </View>
    );
}