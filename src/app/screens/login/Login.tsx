import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { Control, FieldValues, useController, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { navigationController } from '../../../core/controllers/NavigationController';
import { UserSessionDTO } from '../../../core/dtos/UserSessionDTO';

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
            className="px-2 py-0.5 border border-gray-400 rounded mb-4"
            value={field.value}
            onChangeText={field.onChange}
        />
    )

}

export default function LoginScreen() {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const { setSession } = navigationController();

    const { handleSubmit, control } = useForm();

    const onSubmit = async (data: FieldValues) => {

        const response = await axios.get<UserSessionDTO>(`http://${process.env.EXPO_PUBLIC_API_URL}:3000/user/login`, {
            params: {
                email: data.email,
                password: data.password
        }}).catch(error => {console.log(error.response.data)});

        const user : UserSessionDTO | undefined = response?.data;

        setSession(user);

        if(user?.role === 'student') navigation.navigate('StudentDrawer');

        if(user?.role === 'teacher') navigation.navigate('TeacherDrawer');

    }

    return(
        <View className="w-full flex-1 p-4 justify-center">
            <Image className="self-center mb-10" source={require('../../../../assets/logoIdUFF.png')} style={{width: 140, height: 150}}/>
            <Text className="self-center mb-10 text-xl">Acesso aos sistemas da UFF</Text>

            <Text className="mb-2">Identificação (idUFF)</Text>
            <Input name='email' placeholder='CPF, email, passaporte' control={control} />
            <Text className="mb-2">Senha</Text>
            <Input name='password' control={control} />
            <Button title="ACESSAR" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}