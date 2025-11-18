import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useState,useContext,createContext } from 'react'
import { vh, vw } from 'react-native-css-vh-vw';
import Login from "./Telas/login";
import Cadastro from "./Telas/cadastro";
import Home from './Telas/Home';
import Perfil from './Telas/perfil';
import ConfigurarPerfil from './Telas/ConfigurarPerfil';
import ForumDisciplina from './Telas/forumDisciplina';
import CriarTopico from './Telas/criarTopico';


const Stack = createNativeStackNavigator();

export const IdContext = createContext();


export default function App() {

  const [idUsuario, setIdUsuario] = useState(0);

  return (
    <SafeAreaProvider>
      <IdContext.Provider value={[idUsuario,setIdUsuario]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name = "Login" component={Login}/>
            <Stack.Screen name = "Cadastro" component={Cadastro}/>
            <Stack.Screen name = "Home" component={Home}/>
            <Stack.Screen name = "Perfil" component={Perfil}/>
            <Stack.Screen name = "ConfigurarPerfil" component={ConfigurarPerfil}/>
            <Stack.Screen name = "ForumDisciplina" component={ForumDisciplina}/>
            <Stack.Screen name = "CriarTopico" component={CriarTopico}/>
          </Stack.Navigator>
        </NavigationContainer>
      </IdContext.Provider>
    </SafeAreaProvider>
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
