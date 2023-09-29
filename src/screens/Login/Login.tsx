import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text, View } from "react-native";
import FormInputComponent from "../../components/FormInputComponent";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {

    const navigation = useNavigation<StackNavigationProp<any>>();

    return(
        <View className="w-full flex-1 p-4 justify-center">
            <Text className="self-center mb-10 text-xl">Acesso aos sistemas da UFF</Text>
            <FormInputComponent label="Identificação (idUFF)" placeholder="CPF, email, passaporte" />
            <FormInputComponent label="Senha"  />
            <Button title="ACESSAR" onPress={() => {
                navigation.navigate('Drawer');
            }} />
        </View>
    )
}