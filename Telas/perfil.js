import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';


export default function Perfil({navigation}){

    return(
        <>
            <View style = {styles.container}>
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                   
                   <Image source = {require("../assets/medalhas/medalhaBronze.png")} style = {{width: '57%',height: '37%'}} />
                   <View style = {{display: 'flex',width: '80%', marginBottom: '5%', flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style = {{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Caio Rangel</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ConfigurarPerfil')}>

                          <Image source={require("../assets/icones/iconeEngrenagem.png")}
                          style = {{width: 45,height: 45}}/>

                        </TouchableOpacity>
                   </View>
                    <View style = {{gap: 10}}>
                        <Text style = {{color: 'white', fontSize: 15, fontWeight: 500}}>Pontuação total do perfil: 500 </Text>
                        <Text style = {{color: 'white', fontSize: 15, fontWeight: 500}}>Pontuação necessária para a próxima medalha: 200</Text>
                    </View>

                    <View style = {{width: '100%',marginTop: 30, color: 'black', display: 'flex', flexDirection: 'row',justifyContent: 'space-evenly'}}>
                      <Text style = {{fontSize: 20,fontWeight: 'bold',textDecorationLine: 'underline', color: 'white' }}>Dúvidas</Text>
                      <Text style = {{fontSize: 20,fontWeight: 'bold', color: 'white'}}>Respostas</Text>
                    </View>

                    <Post></Post>
                    <Post></Post>
                    <Post></Post>

                </LinearGradient>
            </View>
            
        </>
    )

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  tela: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    display:'flex',
    alignItems: 'center'
  },
  
});
