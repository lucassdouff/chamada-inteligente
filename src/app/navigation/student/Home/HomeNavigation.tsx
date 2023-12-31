import { useNavigation, DrawerActions } from "@react-navigation/core";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import ClassScreen from "../../../screens/student/Class/Class";
import HomeScreen from "../../../screens/student/Home/Home";
import ManageClassScreen from "../../../screens/student/ManageClass/ManageClass";

const Stack = createStackNavigator();

export function HomeNavigation() {

    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return(
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Turmas", headerLeft: () => (
                <View style={{ margin: 10 }}>
                    <Icon name="menu" size={20} color={'#000'} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                </View>
            )}} />
            <Stack.Screen name="Turma" component={ClassScreen} />
            <Stack.Screen name="Consultar Aula" component={ManageClassScreen} />
        </Stack.Navigator>
    );
}