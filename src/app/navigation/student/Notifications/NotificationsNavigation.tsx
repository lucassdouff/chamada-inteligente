import { useNavigation, DrawerActions } from "@react-navigation/core";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationScreen from "../../../screens/student/Notifications/Notifications";

const Stack = createStackNavigator();

export function NotificationsNavigation() {

    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return(
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{title: "Notificações", headerLeft: () => (
                <View style={{ margin: 10 }}>
                    <Icon name="menu" size={20} color={'#000'} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                </View>
            )}} />
        </Stack.Navigator>
    );
}