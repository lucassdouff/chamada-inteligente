import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./login/Login";
import StudentDrawerNavigation from "./student/navigation/StudentDrawerNavigation";
import TeacherDrawerNavigation from "./teacher/navigation/TeacherDrawerNavigation";

const Stack = createStackNavigator();

export default (props: any) => (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="StudentDrawer" component={StudentDrawerNavigation} />
        <Stack.Screen name="TeacherDrawer" component={TeacherDrawerNavigation} />
        <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
