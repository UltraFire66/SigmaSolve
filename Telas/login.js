import { View, Text, ScrollView, StyleSheet,Button } from 'react-native';

export default function Login({navigation}){

    return(
        <>
            <Text> Login</Text>
            <Button onPress={() => {navigation.navigate('Cadastro')}}>ir para Cadastro</Button>
        </>
    )

}