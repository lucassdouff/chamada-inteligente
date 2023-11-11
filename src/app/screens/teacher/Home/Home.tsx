import { Alert, BackHandler, ScrollView, View } from "react-native";
import ClassCardComponent from "../../../../components/Cards/ClassCardComponent";
import { navigationController } from "../../../../core/controllers/NavigationController";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserClassesDTO } from "../../../../core/dtos/UserClassesDTO";
import { useNavigation } from "@react-navigation/core";

export default function HomeScreen() {

    const navigation = useNavigation();
    const { userSession } = navigationController();

    const [userClasses, setUserClasses] = useState<UserClassesDTO[] | undefined>();

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

        const backAction = () => {
            Alert.alert('Espere!', 'Tem certeza que quer sair?', [
                {
                    text: 'Cancelar',
                    onPress: () => null,
                    style: 'cancel',
                },
                {text: 'Sim', onPress: () => BackHandler.exitApp()},
            ]);
            return true;
        };
        
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
            
        fetchClasses();
        
        return () => backHandler.remove();
        
    }, [userSession, navigation]);

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