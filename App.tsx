import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/Home';
import NotificationsScreen from './screens/Notifications';
import LoginScreen from './screens/Login';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginScreen} options={{drawerItemStyle: {display: 'none'}, headerShown: false}} />
        <Drawer.Screen name="Turmas" component={HomeScreen} />
        <Drawer.Screen name="Notificações" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
