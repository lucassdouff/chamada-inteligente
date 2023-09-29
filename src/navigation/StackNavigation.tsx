import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login/Login";
import DrawerNavigation from "./DrawerNavigation";

const Stack = createStackNavigator();

export default (props: any) => (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
