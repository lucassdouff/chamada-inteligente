import { useNavigation, DrawerActions } from "@react-navigation/core";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../../screens/teacher/Home/Home";
import ClassScreen from "../../../screens/teacher/Class/Class";
import ManageClassScreen from "../../../screens/teacher/ManageClass/ManageClass";
import ManageCallsScreen from "../../../screens/teacher/ManageCalls/ManageCalls";


const Stack = createStackNavigator();

export function HomeNavigation() {

    const drawerNavigation = useNavigation<DrawerNavigationProp<any>>();

    const stackNavigation = useNavigation<StackNavigationProp<any>>();

    return(
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Turmas", headerLeft: () => (
                <View style={{ margin: 10 }}>
                    <Icon name="menu" size={20} color={'#000'} onPress={() => drawerNavigation.dispatch(DrawerActions.openDrawer())} />
                </View>
            )}} />
            <Stack.Screen name="Turma" component={ClassScreen} />
            <Stack.Screen name="Gerenciar Turma" component={ManageClassScreen} />
            <Stack.Screen name="Gerenciar Chamadas" component={ManageCallsScreen} />
        </Stack.Navigator>
    );
}