import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { userID } from '../context/idUsuario';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vh, vw } from 'react-native-css-vh-vw';


export default function Perfil({navigation}){
    const [idUsuario,setIdUsuario] = useContext(userID)
    const [nome, setNome] = useState('')
    const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
    const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
    const supabase = createClient(supabaseUrl, supabaseKey)
    const [medalhaBronze, setMedalhaBronze] = useState(false)
    const [medalhaPrata, setMedalhaPrata] = useState(false)
    const [medalhaOuro, setMedalhaOuro] = useState(false)
    const [medalhaMax, setMedalhaMax] = useState(false)
    const [likes, setLikes] = useState(0)
    const [falta, setFalta] = useState(0)

    async function buscaNome(){
      const { data, error } = await supabase
              .from('usuario')
              .select('*')
              .eq('idusuario', idUsuario)
      setNome(data[0].nome)
      setLikes(data[0].likes)
      if(data[0].likes > 15){
        setMedalhaMax(true)
      }else if(data[0].likes > 10){
        setMedalhaOuro(true)
        setFalta(15-likes)
      }else if(data[0].likes > 5){
        setMedalhaPrata(true)
        setFalta(10-likes)
      }else{
        setMedalhaBronze(true)
        setFalta(5-likes)
      }
      console.log(data[0].nome)
    }

    useEffect(() => {
      buscaNome()
    }, [])

    return(
        <SafeAreaView style = {styles.safeContainer}>
            <View style = {styles.container}>
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                   <View style={{width: '90%', marginLeft:'5%', marginVertical: '10%',gap:50, display:'flex',flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style = {{width: '10%',backgroundColor: '#D9D9D9', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 5, display: 'flex', alignItems: 'center'}} onPress={() => navigation.goBack()}>
                            <Image source = {require("../assets/icones/iconeSetaEsquerda.png")}
                            style = {{width: 30, height: 30}}/>
                        </TouchableOpacity>
                   </View>
                   {medalhaBronze && (<Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />)}
                   {medalhaPrata && (<Image source = {require("../assets/medalhas/medalhaPrata.png")} style={styles.medalha} />)}
                   {medalhaOuro && (<Image source = {require("../assets/medalhas/medalhaOuro.png")} style={styles.medalha} />)}
                   {medalhaMax && (<Image source = {require("../assets/medalhas/medalhaMaxima.png")} style={styles.medalha} />)}
                   <View style = {{display: 'flex',width: '80%', marginBottom: '5%', flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style = {{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{nome}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ConfigurarPerfil')}>

                          <Image source={require("../assets/icones/iconeEngrenagem.png")}
                          style = {{width: 45,height: 45}}/>

                        </TouchableOpacity>
                   </View>
                   <View style = {{justifyContent: 'center', alignItems:'center', gap: 10}}>
                        <Text style = {{color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 500}}>Pontuação total do perfil: {likes} </Text>
                        <Text style = {{color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 500}}>Pontuação necessária para a próxima medalha: {medalhaMax ? '\nParabéns, você alcançou a medalha máxima!' : falta}</Text>
                    </View>

                    <View style = {{width: '100%',marginTop: 30, color: 'black', display: 'flex', flexDirection: 'row',justifyContent: 'space-evenly'}}>
                      <Text style = {{fontSize: 20,fontWeight: 'bold',textDecorationLine: 'underline', color: 'white' }}>Dúvidas</Text>
                      <Text style = {{fontSize: 20,fontWeight: 'bold', color: 'white'}}>Respostas</Text>
                    </View>

                </LinearGradient>
            </View>
            
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  
  safeContainer:{
    flex: 1
  },
  
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
  
  medalha:{
    width: '57%',
    height: '37%'
    
  }
});
