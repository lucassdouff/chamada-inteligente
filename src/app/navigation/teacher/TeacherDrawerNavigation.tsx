import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { HomeNavigation } from "./Home/HomeNavigation";
import { NotificationsNavigation } from "./Notifications/NotificatiosNavigation";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { navigationController } from "../../../core/controllers/NavigationController";

const Drawer = createDrawerNavigator();

function AppDrawerContent (props:any) {

    const navigation = useNavigation<StackNavigationProp<any>>();
    const { setSession } = navigationController();

    return (
       <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
         <DrawerItemList {...props} />
         <View style={{flex:1,marginVertical:20}}>
           <DrawerItem 
             label="Log out"
             onPress={()=>{
                setSession(undefined);
                navigation.navigate('Login');
             }}
             style={{flex:1,justifyContent:'flex-end'}}
           />
         </View>
       </DrawerContentScrollView>
     );
}

export default (props: any) => (
    <Drawer.Navigator drawerContent={props=><AppDrawerContent {...props}/>} screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Turmas" component={HomeNavigation} />
        <Drawer.Screen name="Notificações" component={NotificationsNavigation} />
    </Drawer.Navigator>
);