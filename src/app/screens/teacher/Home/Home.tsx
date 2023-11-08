import { View } from "react-native";
import ClassCardComponent from "../../../../components/Cards/ClassCardComponent";
import { navigationController } from "../../../../core/controllers/NavigationController";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserClassesDTO } from "../../../../core/dtos/UserClassesDTO";

export default function HomeScreen() {

    const { userSession } = navigationController();

    const [userClasses, setUserClasses] = useState<UserClassesDTO[] | undefined>();

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await axios.get<UserClassesDTO[]>('http://192.168.0.141:3000/class', {
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
        <View className="py-2 px-4 w-full mt-2">
            {
                userClasses?.map((userClass) => {
                    return(            
                        <ClassCardComponent
                            key={userClass.idClass}
                            idTurma={userClass.idClass}
                            codigoTurma={userClass.code}
                            nomeTurma={userClass.name}
                            semestre={userClass.semester}
                        />
                    );
                })
            }
        </View>
    );
}