import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeNavigation } from "./Home/HomeNavigation";
import { NotificationsNavigation } from "./Notifications/NotificatiosNavigation";

const Drawer = createDrawerNavigator();

export default (props: any) => (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Turmas" component={HomeNavigation} />
        <Drawer.Screen name="Notificações" component={NotificationsNavigation} />
    </Drawer.Navigator>
);