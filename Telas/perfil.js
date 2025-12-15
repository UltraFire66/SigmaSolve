import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, FlatList, Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { useContext, useState, useEffect } from 'react'
import { supabase } from '../context/supabase';
import { userID } from '../context/idUsuario';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vh, vw } from 'react-native-css-vh-vw';
import { useRoute } from '@react-navigation/native';


export default function Perfil({navigation}){
    const [idUsuario,setIdUsuario] = useContext(userID)
    const [nome, setNome] = useState('')
    const [medalhaBronze, setMedalhaBronze] = useState(false)
    const [medalhaPrata, setMedalhaPrata] = useState(false)
    const [medalhaOuro, setMedalhaOuro] = useState(false)
    const [medalhaMax, setMedalhaMax] = useState(false)
    const [likes, setLikes] = useState(0)
    const [falta, setFalta] = useState(0)
    const [posts, setPosts] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [temPost,setTemPost] =  useState(true);
    const [nomeDis,setNomeDis] =  useState('');
    const [pesquisaNavegacao,setPesquisaNavegacao] =  useState('');
    const [duvida,setDuvida] =  useState(true);

    
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
                usuario (nome, likes),
                fk_disciplina_coddisciplina,
                disciplina (nomedisciplina, coddisciplina, idDisciplina, visivel)
                `, { count: 'exact'})
              .eq('flagdenunciado', false)  
              .eq('fk_usuario_idusuario', idUsuario);
      console.log(data.length)
      console.log(data[0])
      setPesquisaNavegacao(data.disciplina)
      setNomeDis(data[0].disciplina.nomedisciplina)
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
      buscaPosts()
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

                    
                      {duvida ? (
                      <View style = {{width: '100%',marginTop: 30, color: 'black', display: 'flex', flexDirection: 'row',justifyContent: 'space-evenly'}}>
                        <TouchableOpacity onPress={() => setDuvida(true)}>  
                          <Text style = {{fontSize: 20,fontWeight: 'bold',textDecorationLine: 'underline', color: 'white' }}>Tópicos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDuvida(false)}>
                          <Text style = {{fontSize: 20,fontWeight: 'bold', color: 'white'}}>Comentários</Text>
                        </TouchableOpacity>
                      </View>) : 
                      (<View style = {{width: '100%',marginTop: 30, color: 'black', display: 'flex', flexDirection: 'row',justifyContent: 'space-evenly'}}>
                          <TouchableOpacity onPress={() => setDuvida(true)}>  
                            <Text style = {{fontSize: 20,fontWeight: 'bold', color: 'white'}}>Tópicos</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setDuvida(false)}>
                            <Text style = {{fontSize: 20,fontWeight: 'bold', color: 'white', textDecorationLine: 'underline'}}>Comentários</Text>
                          </TouchableOpacity>
                      </View>)
                      }
                      
                      
                    

                    {temPost && duvida ? 
                      (<View style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
                            <FlatList
                              data={posts}
                              keyExtractor={(item) => item.idtopico.toString()}
                              scrollEnabled={false}
                              renderItem={({ item }) => (
                              
                                <Post fromScreen = "Perfil" disciplina = {nomeDis} post={item} pesquisaNavegacao =  {pesquisaNavegacao} navigation = {navigation}></Post>

                            )}
                            />
                          </View>) : (
                      <View style = {{display: 'flex', alignItems: 'center', minWidth:vw(50),minHeight: vh(30), marginBottom: vh(5)}}>
                            <Image source={require("../assets/rato-sem-post.png")} resizeMode="contain" style={{marginTop: "10%", minWidth:vw(50),minHeight: vh(30)}} />
                            <Text style = {styles.titulo}>Você ainda não fez publicações</Text>
                      </View>)}

                    
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
    
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  }
});
