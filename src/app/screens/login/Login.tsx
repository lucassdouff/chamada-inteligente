import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { Control, FieldValues, useController, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { UserDTO } from '../../../core/dtos/UserDTO';

interface InputController {
    control: Control<FieldValues, any>;
    name: string;
    placeholder?: string;
}

const Input = ({ control, name, placeholder }: InputController) => {

    const { field } = useController ({
        control,
        name,
        defaultValue: '',
    });

    return (
        <TextInput 
            placeholder={placeholder}
            underlineColorAndroid="transparent"
            className="px-2 py-0.5 border border-gray-400 rounded"
            value={field.value}
            onChangeText={field.onChange}
        />
    )

}

export default function LoginScreen() {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const { handleSubmit, control } = useForm();

    const onSubmit = async (data: FieldValues) => {
        const user : UserDTO = await axios.get('http://localhost:3000/user/login', {
            params: {
                email: data.email,
                password: data.password
            }
        })
        .then((response) => {return response.data})
        .catch((error) => {return error});

    }

    return(
        <View className="w-full flex-1 p-4 justify-center">
            <Image className="self-center mb-10" source={require('../../../../assets/logoIdUFF.png')} style={{width: 140, height: 150}}/>
            <Text className="self-center mb-10 text-xl">Acesso aos sistemas da UFF</Text>

            <Input name='email' placeholder='CPF, email, passaporte' control={control} />
            <Input name='password' control={control} />
            <Button title="ACESSAR" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}