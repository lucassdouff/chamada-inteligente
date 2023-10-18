import { View, Text } from "react-native";
import ListItemComponent from "./ListItemComponent";
import { ListDataModel } from "../core/models/ListDataModel";

interface ListComponentProps {
    listType: 'teacher' | 'student';
    listData: ListDataModel[];
}   



export default function ListComponent({listType, listData} : ListComponentProps){
    return(
        <View className="flex-col divide-y">
                {listType=='teacher'?<Text className='p-2 mt-1 text-xl'>Professores</Text>:
                <View className="flex-row justify-between items-center">
                    <Text className='p-2 mt-1 text-xl'>Alunos</Text>
                    <Text className='p-3 mt-2 text-sm'>{listData.length + " aluno(s)"}</Text>
                </View>
                }
            <View className="flex-col items-center">
                {listData.map(data =>
                    <ListItemComponent itemData = {data} />)
                    }
            </View>
        </View>
    )
}