import { View, Text, ScrollView, StyleSheet,Button } from 'react-native';

export default function Cadastro({navigation}){

    return(
        <>
            <Text> Boa sorte davi ;) </Text>
            <Button onPress={() => {navigation.navigate('Login')}}>ir para Cadastro</Button>
        </>
    )

}