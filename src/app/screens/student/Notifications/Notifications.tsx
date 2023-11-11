import { ScrollView, Text, View } from "react-native";
import NotificationCardComponent from "../../../../components/Cards/NotificationCardComponent";

export default function NotificationScreen() {
    return(
        <ScrollView className="py-2 px-6 w-full mt-2">
            <NotificationCardComponent title={'Teste'} content='Eu sou o Dougras, você não é o Dougras, eu estou aqui, to aqui. Eu sou o Dougras, você não é o Dougras, eu estou aqui, to aqui. Eu sou o Dougras, você não é o Dougras, eu estou aqui, to aqui'/>
            <NotificationCardComponent title={'Teste'} content='Eu sou o Dougras, você não é o Dougras, eu estou aqui, to aqui. Eu sou o Dougras, você não é o Dougras, eu estou aqui, to aqui. Eu sou o Dougras, você não é o Dougras, eu estou aqui, to aqui'/>
            <NotificationCardComponent title={'Teste'} content='Eu sou o Dougras, você não é o.'/>
        </ScrollView>
    );
}