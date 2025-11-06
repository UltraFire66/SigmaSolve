import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { IdContext } from '../App';


export default function Perfil({navigation}){
    const [idUsuario,setIdUsuario] = useContext(IdContext)
    const [nome, setNome] = useState('')
    const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
    const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
    const supabase = createClient(supabaseUrl, supabaseKey)
    async function buscaNome(){
      const { data, error } = await supabase
              .from('usuario')
              .select('*')
              .eq('idusuario', idUsuario)
      setNome(data[0].nome)
      console.log(data[0].nome)
    }
    useEffect(() => {
      buscaNome()
    }, [])

    return(
        <>
            <View style = {styles.container}>
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                   <View style={{width: '90%', marginLeft:'5%', marginVertical: '10%',gap:50, display:'flex',flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style = {{width: '10%',backgroundColor: '#D9D9D9', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 5, display: 'flex', alignItems: 'center'}} onPress={() => navigation.navigate('Home')}>
                            <Image source = {require("../assets/icones/iconeSetaEsquerda.png")}
                            style = {{width: 30, height: 30}}/>
                        </TouchableOpacity>
                   </View>
                   <Image source = {require("../assets/medalhas/medalhaBronze.png")} style = {{width: '57%',height: '37%'}} />
                   <View style = {{display: 'flex',width: '80%', marginBottom: '5%', flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style = {{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{nome}</Text>
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
