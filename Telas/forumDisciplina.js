import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../context/supabase';
import { useRoute } from '@react-navigation/native';
import { userID } from '../context/idUsuario';
import Menu from '../components/menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vh, vw } from 'react-native-css-vh-vw';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';


export default function ForumDisciplina({navigation}){
  const [idUsuario,setIdUsuario] = useContext(userID)
  const [nome, setNome] = useState('')
  const route = useRoute();
  const {item} = route.params;
  const pesquisaNavegacao = item; 
  const [posts,setPosts] = useState([]);
  const [temPost,setTemPost] =  useState(true);
  const [carregando,setCarregando] = useState(true);
  const nomeDis = item.nomedisciplina
  const [medalhaBronze, setMedalhaBronze] = useState(false)
  const [medalhaPrata, setMedalhaPrata] = useState(false)
  const [medalhaOuro, setMedalhaOuro] = useState(false)
  const [medalhaMax, setMedalhaMax] = useState(false)

  async function buscaNome(){
    const { data, error } = await supabase
            .from('usuario')
            .select('*')
            .eq('idusuario', idUsuario)
    setNome(data[0].nome)
    
    if(data[0].likes > 15){
      setMedalhaMax(true)
    }else if(data[0].likes > 10){
      setMedalhaOuro(true)
    }else if(data[0].likes > 5){
      setMedalhaPrata(true)
    }else{
      setMedalhaBronze(true)
    }
    console.log(data[0].nome)
  }
  

  async function buscaPosts(){
    const { data, error } = await supabase
            .from('topico')
            .select(`idtopico,
              conteudotexto,
              conteudoimg,
              titulotopico,
              datacriacao,
              urlPDF,
              nomePdf,
              usuario (nome)
              `, { count: 'exact'})
            .eq('flagdenunciado', false)
            .eq('fk_disciplina_coddisciplina', item.coddisciplina);
    console.log(data.length)
    if(data.length != 0){
      setPosts(data);
      console.log(data);
      setCarregando(false);
    }
    else{
      setTemPost(false);
      setCarregando(false);
    }
    
  }

  useEffect(() => {
    buscaPosts()
    buscaNome()
  }, []);
  useEffect(() => {
    if (route.params?.atualizar) {
      buscaPosts();
      // opcional: limpar o parâmetro
      navigation.setParams({ atualizar: undefined });
    }
  }, [route.params?.atualizar]);

    return(
        <SafeAreaView style = {styles.safeContainer}>
            <View style = {styles.container}>
              
                <View style = {styles.barraTopo}>
                  <View style = {styles.usuario}>
                    {medalhaBronze && (<Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />)}
                    {medalhaPrata && (<Image source = {require("../assets/medalhas/medalhaPrata.png")} style={styles.medalha} />)}
                    {medalhaOuro && (<Image source = {require("../assets/medalhas/medalhaOuro.png")} style={styles.medalha} />)}
                    {medalhaMax && (<Image source = {require("../assets/medalhas/medalhaMaxima.png")} style={styles.medalha} />)}
                    <TouchableOpacity onPress={()=>navigation.navigate('Perfil')}>
                      <Text style = {{minWidth: vw(20), fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 15, display: 'flex',alignItems: 'center'}}>
                                {nome.length > 10 ? nome.substring(0, 10) + '...' : nome}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style = {{display: 'flex', width: '42%', alignItems: 'center', flexDirection: 'row',height: "60%", borderRadius: 10, backgroundColor: 'white', marginLeft: '5%', marginRight:'5%'}}>
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
                  

                  <View style={{width: '90%', marginLeft:'5%', marginVertical: '5%',gap:50, display:'flex',flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style = {{width: '10%',backgroundColor: '#D9D9D9', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 5, display: 'flex', alignItems: 'center'}} onPress={() => navigation.navigate('Home')}>
                            <Image source = {require("../assets/icones/iconeSetaEsquerda.png")}
                            style = {{width: 30, height: 30}}/>
                        </TouchableOpacity>
                   </View>
                  <View style = {styles.topoTela}>

                    <Text style = {styles.titulo}>{item.nomedisciplina}</Text>
                    
                    <TouchableOpacity style = {styles.criarTopico} onPress={()=>navigation.navigate('CriarTopico', {item: item, fromScreen: 'ForumDisciplina'})}>
                      <Text style ={{fontWeight: 'bold'}}>Criar Tópico</Text>
                    </TouchableOpacity>
                  

                  </View>
                  {carregando && (<View style = {{display:'flex', marginTop: vh(6)}}>
                          <ActivityIndicator size = 'large' color="#000000"/>
                        </View>)}
                  {temPost ? 
                  (<ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', paddingBottom: 100, minHeight:vh(100)}} showsVerticalScrollIndicator={false}>
                      <View style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
                        <FlatList
                          data={posts}
                          keyExtractor={(item) => item.idtopico.toString()}
                          scrollEnabled={false}
                          renderItem={({ item }) => (
                          
                            <Post disciplina = {nomeDis} post={item} pesquisaNavegacao =  {pesquisaNavegacao} navigation = {navigation}></Post>

                        )}
                        />
                      </View>
                  </ScrollView>) : (
                  <View style = {{display: 'flex', alignItems: 'center', minWidth:vw(50),minHeight: vh(30)}}>
                        <Image source={require("../assets/rato-sem-post.png")} resizeMode="contain" style={{marginTop: "10%", minWidth:vw(50),minHeight: vh(30)}} />
                        <Text style = {styles.titulo}>Ainda não há posts para essa disciplina</Text>
                  </View>)}
                   
                  
                  

                </LinearGradient>
          </View>
            
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  
  safeContainer:{
    flex: 1,
    backgroundColor:'#D9D9D9'
  },
  
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
   
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  criarTopico: {
    backgroundColor: 'white',
    width: vw(25),
    height: vh(6),
    borderRadius: 20,
    fontSize: 15,
    fontWeight: 'bold',
    display: 'flex',
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',   
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
