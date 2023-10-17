import { View } from "react-native";
import ClassBoxComponent from "../../../../components/ClassBoxComponent";
import AddElementButton from "../../../../components/AddElementButton";

export default function HomeScreen() {
    return(
        <View className="py-2 px-4 w-full mt-2">
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
            <View className="mt-2">
                <AddElementButton action={() => {}}/>
            </View>
        </View>
    );
}