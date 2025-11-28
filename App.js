import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useState,useContext,} from 'react'
import { vh, vw } from 'react-native-css-vh-vw';
import Login from "./Telas/login";
import Cadastro from "./Telas/cadastro";
import Home from './Telas/Home';
import Perfil from './Telas/perfil';
import ConfigurarPerfil from './Telas/ConfigurarPerfil';
import ForumDisciplina from './Telas/forumDisciplina';
import CriarTopico from './Telas/criarTopico';
import Topico from './Telas/Topico';
import CriarComentario from './Telas/criarComentario';
import AdicionarDisciplina from './Telas/adicionarDisciplina';
import { userID } from './context/idUsuario';

const Stack = createNativeStackNavigator();

export default function App() {

  const [idUsuario, setIdUsuario] = useState(null);

  return (
    <SafeAreaProvider>
      <userID.Provider value={[idUsuario,setIdUsuario]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name = "Login" component={Login}/>
            <Stack.Screen name = "Cadastro" component={Cadastro}/>
            <Stack.Screen name = "Home" component={Home}/>
            <Stack.Screen name = "Perfil" component={Perfil}/>
            <Stack.Screen name = "ConfigurarPerfil" component={ConfigurarPerfil}/>
            <Stack.Screen name = "ForumDisciplina" component={ForumDisciplina}/>
            <Stack.Screen name = "CriarTopico" component={CriarTopico}/>
            <Stack.Screen name = "Topico" component={Topico}/>
            <Stack.Screen name = "CriarComentario" component={CriarComentario}/>
            <Stack.Screen name = "AdicionarDisciplina" component={AdicionarDisciplina}/>
          </Stack.Navigator>
        </NavigationContainer>
      </userID.Provider>
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
