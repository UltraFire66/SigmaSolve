import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRoute } from '@react-navigation/native';
import { IdContext } from '../App';
import Menu from '../components/menu';

export default function Home({navigation}){
  const [idUsuario,setIdUsuario] = useContext(IdContext)
  const [nome, setNome] = useState('')
  const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
  const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
  const supabase = createClient(supabaseUrl, supabaseKey)
  const route = useRoute();
  const {item} = route.params;
  
  

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
                <View style = {styles.barraTopo}>
                  <View style = {styles.usuario}>

                    <Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />
                    <TouchableOpacity onPress={()=>navigation.navigate('Perfil')}>
                      <Text style = {{fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 15, display: 'flex',alignItems: 'center'}}>
                                {nome.length > 10 ? nome.substring(0, 10) + '...' : nome}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style = {{display: 'flex', width: '42%', alignItems: 'center', flexDirection: 'row',height: "60%", borderRadius: 10, backgroundColor: 'white', marginLeft: '5%'}}>
                    <TextInput style = {{width: '80%'}} />
                    <Image source = {require("../assets/icones/iconeLupa.png")}
                    style = {{width: 20, height: 20}}/>
                  </View>

                  <Menu navigation={navigation}></Menu>
                </View>

                
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                  <View style = {styles.topoTela}>

                    <Text style = {styles.titulo}>{item.nomedisciplina}</Text>
                    
                    <TouchableOpacity style = {styles.criarTopico} onPress={()=>navigation.navigate('CriarTopico', {item: item})}>
                      <Text style ={{fontWeight: 'bold'}}>Criar Tópico</Text>
                    </TouchableOpacity>
                  

                  </View>

                  <Post></Post>  
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

  barraTopo: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '10%',
    boxShadow: '0px 0px 5px 0px black',
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tela: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    display:'flex',
    alignItems: 'center'
  },
  topoTela: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
    opacity: 1,
    marginBottom: '10%',
    marginTop: '10%'
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  criarTopico: {
    backgroundColor: 'white',
    width: '25%',
    height: '90%',
    borderRadius: 20,
    fontSize: 15,
    fontWeight: 'bold',
    display: 'flex',
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    marginRight: '6%',
    
  },
  usuario:{
    display:'flex',
    flexDirection: 'row',
    gap: '5%',
   alignItems: 'center',
  },

  medalha:{
    width: 35,
    height: 40,
    objectFit: 'contain',
    
  }
});
