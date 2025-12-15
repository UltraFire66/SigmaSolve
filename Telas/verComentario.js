import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Comentario from '../components/comentario';
import { useContext, useState, useEffect } from 'react'
import { supabase } from '../context/supabase';
import { useRoute } from '@react-navigation/native';
import { userID } from '../context/idUsuario';
import Menu from '../components/menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vh, vw } from 'react-native-css-vh-vw';


export default function verComentario({navigation}){
  const [idUsuario,setIdUsuario] = useContext(userID)
  const [nome, setNome] = useState('')
  const route = useRoute();
  const {comentario} = route.params;
  const {disciplina} = route.params;
  const {numComentarios} = route.params;
  const [posts,setPosts] = useState([]);
  const [temPost,setTemPost] =  useState(true);
  const [carregando,setCarregando] = useState(true);
  const [medalhaBronze, setMedalhaBronze] = useState(false)
  const [medalhaPrata, setMedalhaPrata] = useState(false)
  const [medalhaOuro, setMedalhaOuro] = useState(false)
  const [medalhaMax, setMedalhaMax] = useState(false)
  const [medalhaBronzeComentario, setMedalhaBronzeComentario] = useState(false)
  const [medalhaPrataComentario, setMedalhaPrataComentario] = useState(false)
  const [medalhaOuroComentario, setMedalhaOuroComentario] = useState(false)
  const [medalhaMaxComentario, setMedalhaMaxComentario] = useState(false)

  console.log('aqui')
  console.log(comentario)

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
              usuario (nome)
              `, { count: 'exact'})
            .eq('fk_disciplina_coddisciplina', props.idcodigo);
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
    
    if(comentario.usuario.likes > 15){
      setMedalhaMaxComentario(true)
    }else if(comentario.usuario.likes.likes > 10){
      setMedalhaOuroComentario(true)
    }else if(comentario.usuario.likes.likes > 5){
      setMedalhaPrataComentario(true)
    }else{
      setMedalhaBronzeComentario(true)
    }

    buscaNome()
    
  }, [])
  

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
                        <TouchableOpacity style = {{width: '10%',backgroundColor: '#D9D9D9', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 5, display: 'flex', alignItems: 'center'}} onPress={() => navigation.goBack()}>
                            <Image source = {require("../assets/icones/iconeSetaEsquerda.png")}
                            style = {{width: 30, height: 30}}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.topoTela}>
                        <Text style = {styles.titulo}>{disciplina}</Text>
                    </View>
                    <TouchableOpacity style = {styles.criarTopico} onPress={()=>navigation.navigate('CriarComentario')}>{/*acrescentar o id do comentario e mais informações extras sobre ele para a tela por route*/}
                        <Text style ={{fontWeight: 'bold'}}>Comentar</Text>
                    </TouchableOpacity>                  
                    
                     {/* inicio da parte de comentario */}
                     {/* ============================================================= */}
                            
                        {/*<View style = {styles.fundo}>
                          <View style = {styles.usuarioComentario}>
                
                            {medalhaBronzeComentario && (<Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalhaComentario} />)}
                            {medalhaPrataComentario && (<Image source = {require("../assets/medalhas/medalhaPrata.png")} style={styles.medalhaComentario} />)}
                            {medalhaOuroComentario && (<Image source = {require("../assets/medalhas/medalhaOuro.png")} style={styles.medalhaComentario} />)}
                            {medalhaMaxComentario && (<Image source = {require("../assets/medalhas/medalhaMaxima.png")} style={styles.medalhaComentario} />)}
                              <Text style = {{fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 13, display: 'flex',alignItems: 'center'}}>{comentario.usuario.nome}</Text>
                          
                          </View>
                
                          <Text style = {{fontSize: 14,fontWeight: 'bold',width: '95%',padding:'5%'}}>{comentario.conteudotexto}</Text>
                          
                          <View style = {{display:'flex',justifyContent:'center', alignItems: 'center'}}>
                              {comentario.conteudoimg && <Image source={{uri: comentario.conteudoimg}} resizeMode="stretch" style = {{width:vw(50),height: vh(20)}}/>}
                              {comentario.urlPDF && 
                                <TouchableOpacity onPress = {() => Linking.openURL(comentario.urlPDF)}>
                                  <Feather name = 'file-text' size={100} color="black" />
                                  <Text style={{ fontWeight: "bold", marginBottom: 10, textAlign: 'center' }}>
                                    {comentario.nomePdf}
                                  </Text>
                                </TouchableOpacity>
                              }
                          </View>
                
                          <View style = {styles.opcoes}>
                              <TouchableOpacity style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
                              
                              <Image source = {require("../assets/icones/iconeComentarioPreto.png")} resizeMode="cover"
                              style = {{width:32,height: 32,marginTop: 3,marginLeft: '3%'}}/>
                              <Text style = {{color: 'black',fontSize: 13}}>{numComentarios}</Text>
                
                            </TouchableOpacity>
                
                            {likeDado ? (
                
                            <TouchableOpacity onPress =  {()=> {tirarLike()}} style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
                              
                              <Image source = {require("../assets/icones/iconeLikePreenchido.png")}
                              style = {{width:22,height: 22,marginTop: 3,marginLeft: '3%'}}/>
                              <Text style = {{color: 'black',fontSize: 13}}>{props.comentario.likes + deuLike}</Text>
                
                            </TouchableOpacity>
                
                
                            ) :
                            
                            (
                
                            <TouchableOpacity onPress =  {()=> {darLike()}} style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
                              
                              <Image source = {require("../assets/icones/iconeLike.png")}
                              style = {{width:22,height: 22,marginTop: 3,marginLeft: '3%'}}/>
                              <Text style = {{color: 'black',fontSize: 13}}>{props.comentario.likes + deuLike}</Text>
                
                            </TouchableOpacity>
                
                            )}
                          </View>
                        </View>*/}
                        {/* ============================================================= */}
                        {/* fim da parte de comentario */}
                        <View style = {{border: 50,backgroundColor: '#D9D9D9',marginTop: 30,}}>
                          <Comentario disciplina = {disciplina} comentario = {comentario} numComentarios = {numComentarios} navigation = {navigation}></Comentario>
                        </View>
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
    
  },

  fundo:{

   
    width: vw(72),
    backgroundColor: '#D9D9D9',
    borderRadius: 27,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: vh(2)
  },
  
   usuarioComentario:{
    display:'flex',
    flexDirection: 'row',
    gap: '2%',
    alignItems:'center',
  
  },

  medalhaComentario:{
    width: 25,
    height: 30,
    objectFit: 'contain',
    marginLeft:vw(3),
    marginTop:vh(0.5)
  },
 
  opcoes:{

    display: 'flex',
    flexDirection: 'row',
    gap:'2%',
    marginLeft: vw(1),
    alignItems: 'center',
    paddingBottom: vh(1)
  },
});
