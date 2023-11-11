import { View } from "react-native";
import ListComponent from "../../../../components/Lists/ListComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserClassesDTO } from "../../../../core/dtos/UserClassesDTO";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ClassStudentListDTO } from "../../../../core/dtos/ClassStudentListDTO";
import { ListDataModel } from "../../../../core/models/ListDataModel";
import { navigationController } from "../../../../core/controllers/NavigationController";

export type StackParamList = {
    Class: { userClass: UserClassesDTO};
}

export default function ManageClassScreen({ route }: NativeStackScreenProps<StackParamList, 'Class'>) {

    const {userSession} = navigationController();

    const {userClass} = route.params;

    const [classStudentList, setClassStudentList] = useState<ListDataModel[]>();

    useEffect(()=>{
        const fetchStudents = async () => {
            try {
                const response = await axios.get<ClassStudentListDTO[]>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/class/students?id_class=${userClass.id_class}`);

                const list : ClassStudentListDTO[] | undefined = response?.data;
            
                const studentListMapped : ListDataModel[] | undefined = list.map(student => {
                    return{
                        id : student.id_student,
                        name: student.name,
                        info: {
                            description: '75'
                        }
                    }
                });

                setClassStudentList(studentListMapped);
            } catch(error) {
                console.log(error);
            }
            
        }
    
        fetchStudents();
    },[userClass.id_class]);


    return (
        <View className="flex-col py-2 px-4 w-full mt-2 overflow-auto">
            <View className="mb-6">
                <ListComponent listType={"teacher"} listData={[
                    {
                        id: userSession?.id,
                        name: userSession?.id?.toString(),
                    }
                ]} />
            </View>

            <ListComponent listType={"student"} listData={classStudentList} />
        </View>
    )
}