import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { HomeNavigation } from "./Home/HomeNavigation";
import { NotificationsNavigation } from "./Notifications/NotificatiosNavigation";
import { CommonActions, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { navigationController } from "../../../core/controllers/NavigationController";
import React from "react";
import { View } from "react-native";

const Drawer = createDrawerNavigator();

function AppDrawerContent (props:any) {

    const navigation = useNavigation();

    return (
       <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
         <DrawerItemList {...props} />
         <View style={{flex:1,marginVertical:20}}>
           {/* here's where you put your logout drawer item*/}
           <DrawerItem 
             label="Log out"
             onPress={()=>{}
             }
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