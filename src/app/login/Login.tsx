import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text, View, Image } from "react-native";
import FormInputComponent from "../../components/FormInputComponent";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {

    const navigation = useNavigation<StackNavigationProp<any>>();

    return(
        <View className="w-full flex-1 p-4 justify-center">
            <Image className="self-center mb-10" source={require('../../../assets/logoIdUFF.png')} style={{width: 140, height: 150}}/>
            <Text className="self-center mb-10 text-xl">Acesso aos sistemas da UFF</Text>
            <FormInputComponent label="Identificação (idUFF)" placeholder="CPF, email, passaporte" />
            <FormInputComponent label="Senha"  />
            <Button title="ACESSAR" onPress={() => {
                navigation.navigate('StudentDrawer');
            }} />
        </View>
    )
}