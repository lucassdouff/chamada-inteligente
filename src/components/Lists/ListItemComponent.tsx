import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { ListDataModel } from "../../core/models/ListDataModel";

interface ListItemComponentProps {

    itemData: ListDataModel;
}


export default function ListItemComponent({itemData} : ListItemComponentProps){
    let color = '';
    if (itemData.info){
        if (itemData.info.percent!=null){
            color =itemData.info.percent>=75?' text-green-600':' text-red-600';
        } else {
           color = itemData.info.present?' text-green-600':' text-red-600';
        }
    }

    return (
        <View className='mt-2 border-spacing-y-2 py-3.5 flex-row justify-between border-b border-b-gray-300 w-[97%] items-center'>
            <View className='px-1 flex-row items-center gap-4'>
                {itemData.photo?<Image source={{uri:itemData.photo}}/>:<Image source={require('../../assets/perfil.png')}style={{width: 32, height: 32}}/>}
                
                <Text>{itemData.name}</Text>
            </View>
            {itemData.info?(itemData.info.present!=null?(
                <TouchableWithoutFeedback className='px-2 mr-1' onPress={itemData.info.action}>
                <Text className={'underline'+color}>
                    {itemData.info.present?'PRESENTE':'AUSENTE'}
                </Text>
            </TouchableWithoutFeedback>
            ):
            <Text className={'px-2 mr-1'+ color}>
                {itemData.info.percent}%
            </Text>):null
            }
        </View>
    )
}