import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import Login from "./Telas/login";
import Cadastro from "./Telas/cadastro";
import Home from './Telas/Home';
import Perfil from './Telas/perfil';
import ConfigurarPerfil from './Telas/ConfigurarPerfil';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
=======
      <Stack.Navigator initialRouteName="ConfigurarPerfil" screenOptions={{ headerShown: false }}>
>>>>>>> 4a8122eea1ae013b4314cbc5183a33213edd0ef9
        <Stack.Screen name = "Login" component={Login}/>
        <Stack.Screen name = "Cadastro" component={Cadastro}/>
        <Stack.Screen name = "Home" component={Home}/>
        <Stack.Screen name = "Perfil" component={Perfil}/>
        <Stack.Screen name = "ConfigurarPerfil" component={ConfigurarPerfil}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
