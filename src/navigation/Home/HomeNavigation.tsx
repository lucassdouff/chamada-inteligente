import { useNavigation, DrawerActions } from "@react-navigation/core";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import ClassroomScreen from "../../screens/Classroom/Classroom";
import HomeScreen from "../../screens/Home/Home";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export function HomeNavigation() {

    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return(
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Turmas" component={HomeScreen} options={{headerLeft: () => (
                <View style={{ margin: 10 }}>
                    <Icon name="menu" size={20} color={'#000'} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                </View>
            )}} />
            <Stack.Screen name="Turma" component={ClassroomScreen} />
        </Stack.Navigator>
    );
}