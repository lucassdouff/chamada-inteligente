import { Alert, BackHandler, ScrollView } from "react-native";
import ClassCardComponent from "../../../../components/Cards/ClassCardComponent";
import { navigationController } from "../../../../core/controllers/NavigationController";
import axios from "axios";
import { useState, useEffect } from "react";
import { UserClassesDTO } from "../../../../core/dtos/UserClassesDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import React from "react";

export default function HomeScreen() {

    const { userSession } = navigationController();

    const [userClasses, setUserClasses] = useState<UserClassesDTO[] | undefined>();

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
           
           Alert.alert('Espere!', 'Tem certeza que quer sair?', [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              {text: 'YES', onPress: () => BackHandler.exitApp()},
            ]);
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
    );

    useEffect(() => {

        const fetchClasses = async () => {
            const response = await axios.get<UserClassesDTO[]>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/class`, {
                params: {
                    id: userSession?.id, 
                    role: userSession?.role
            }}).catch(error => {console.log(error.response.data)});

            const classes : UserClassesDTO[] | undefined = response?.data;
            
            setUserClasses(classes);
        };
            
        fetchClasses();
                    
    }, [userSession]);
    
    return(
        <ScrollView className="py-2 px-4 w-full mt-2">
            {
                userClasses?.map((userClass) => {
                    return(            
                        <ClassCardComponent key={userClass.id_class}
                            userClass={userClass}
                        />
                    );
                })
            }
        </ScrollView>
    );
}