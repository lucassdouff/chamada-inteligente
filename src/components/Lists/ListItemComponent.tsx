import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { ListDataModel } from "../../core/models/ListDataModel";

interface ListItemComponentProps {
    itemData: ListDataModel;
}

export default function ListItemComponent({itemData} : ListItemComponentProps){
    let color = '';
    if (itemData.info){
        if(isNaN(Number(itemData.info.description))) {
            if(itemData.info.description == 'PRESENTE') {
                color = ' text-green-600';
            } else { 
                color = ' text-red-600';
            }
        } else {
            if (Number(itemData.info.description) >= 75) {
                color = ' text-green-600';
            } else {
                color = ' text-red-600';
            }
        }
    }

    return (
        <View className='mt-2 border-spacing-y-2 py-3.5 flex-row justify-between border-b border-b-gray-300 w-[97%] items-center'>
            <View className='px-1 flex-row items-center gap-4'>
                <Image source={require('../../../assets/perfil.png')}style={{width: 32, height: 32}}/>
                
                <Text>{itemData.name}</Text>
            </View>
            {
                itemData.info ? (
                    isNaN(Number(itemData.info.description)) ? (
                        <TouchableWithoutFeedback className='px-2 mr-1' onPress={itemData.info.action}>
                            <Text className={'underline'+color}>
                                {itemData.info.description == 'PRESENTE' ? 'PRESENTE' : 'AUSENTE'}
                            </Text>
                        </TouchableWithoutFeedback>
                    ) : (
                        <Text className={'px-2 mr-1'+ color}>
                            {Number(itemData.info.description).toFixed(0)}%
                        </Text>
                    )
                ) : null
            }
        </View>
    )
}