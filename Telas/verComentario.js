import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Comentario from '../components/comentario';
import React, { useContext, useState, useEffect } from 'react'
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
  const {pesquisaNavegacao} = route.params;
  const {numComentarios} = route.params;
  const [comentarios,setComentarios] = useState([]);
  const [temComentario,setTemComentario] =  useState(true);
  const [carregando,setCarregando] = useState(true);
  const [medalhaBronze, setMedalhaBronze] = useState(false)
  const [medalhaPrata, setMedalhaPrata] = useState(false)
  const [medalhaOuro, setMedalhaOuro] = useState(false)
  const [medalhaMax, setMedalhaMax] = useState(false)
  const [medalhaBronzeComentario, setMedalhaBronzeComentario] = useState(false)
  const [medalhaPrataComentario, setMedalhaPrataComentario] = useState(false)
  const [medalhaOuroComentario, setMedalhaOuroComentario] = useState(false)
  const [medalhaMaxComentario, setMedalhaMaxComentario] = useState(false)
  const [numComentariosComentarios,setNumComentariosComentarios]=useState([]);



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

  

  async function buscaComentarios(){

    const { data, error } = await supabase
            .from('comentario')
            .select(`idcomentario,
              conteudotexto,
              conteudoimg,
              data,
              likes,
              urlPDF,
              nomePdf,
              flagdenunciado,
              usuario (nome)
              `, { count: 'exact'})
            .eq('fk_comentario_idcomentario', comentario.idcomentario)
            .eq('flagdenunciado', false)

    console.log(data)

    for(let i = 0;  i < data.length; i++){
        await buscaNumComentarioComentario(data[i].idcomentario);
      }

    if(data.length != 0){
      setComentarios(data);
      setCarregando(false);
      
    }
    else{
      setTemComentario(false);
      setCarregando(false);
 
    }
    
  }

  async function buscaNumComentarioComentario(idComentario){

      //setmodalDenunciaVisible(true);

      const { data, error } = await supabase
              .from('comentario')
              .select('*',{count: 'exact'})
              .eq('fk_comentario_idcomentario', idComentario)
              .eq('flagdenunciado', false)
        
      setNumComentariosComentarios(prev=>{

          const novoArray = prev;

          if(!data)
            novoArray[idComentario] = 0;
          else
            novoArray[idComentario] = data.length;

          return novoArray;

      })
    


    }

  useEffect(() => {
    
    setCarregando(true)
    console.log('entrou na pag')
    if(comentario.usuario.likes > 15){
      setMedalhaMaxComentario(true)
    }else if(comentario.usuario.likes > 10){
      setMedalhaOuroComentario(true)
    }else if(comentario.usuario.likes > 5){
      setMedalhaPrataComentario(true)
    }else{
      setMedalhaBronzeComentario(true)
    }

    buscaNome()
    setComentarios([])
    buscaComentarios()
    
    
  }, [comentario.idcomentario])

  
  

    return(
        <SafeAreaView style = {styles.safeContainer}>
            <View style = {[styles.container,{alignItems:'space-between',width: '100%'}]}>
                <View style = {styles.barraTopo}>
                  <View style = {styles.usuario}>
                    {medalhaBronze && (<Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />)}
                    {medalhaPrata && (<Image source = {require("../assets/medalhas/medalhaPrata.png")} style={styles.medalha} />)}
                    {medalhaOuro && (<Image source = {require("../assets/medalhas/medalhaOuro.png")} style={styles.medalha} />)}
                    {medalhaMax && (<Image source = {require("../assets/medalhas/medalhaMaxima.png")} style={styles.medalha} />)}
                    <TouchableOpacity onPress={()=>navigation.navigate('Perfil')}>
                      <Text style = {{minWidth: vw(20), fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 15, display: 'flex',alignItems: 'center'}}>
                                {nome.length > 20 ? nome.substring(0, 20) + '...' : nome}
                      </Text>
                    </TouchableOpacity>
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
                     
                        <View style = {{width:'auto',height:'auto',backgroundColor: '#D9D9D9',marginTop: 30,marginBottom: -(vh(1)),borderTopLeftRadius:15,borderTopRightRadius:15}}>
                          <Comentario disciplina = {disciplina} comentario = {comentario} tamanhoHorizontal = {83} numComentarios = {numComentarios} navigation = {navigation}></Comentario>
                        </View>
                        
                        

                        <View style ={[styles.respostas,{height: 'auto',paddingTop: vh(1),paddingBottom: vh(4),justifyContent: 'flex-start',alignItems: 'center',flexDirection:  'column',gap: vh(2)}]} >
                          
                          {carregando?(
                            
                            <ActivityIndicator style = {{marginTop:vh(2)}} size = 'large' color="#000000"/>
                            
                          ):(
                            <>
                              <TouchableOpacity style = {styles.criarComentario} onPress={()=>navigation.navigate('CriarComentarioComentario', {props: comentario, pesquisaNavegacao: pesquisaNavegacao, disciplina: disciplina, numComentarios: numComentarios})} >
                                <Text style ={{fontWeight: 'bold'}}>Comentar</Text>
                              </TouchableOpacity>

                              <FlatList
                                  data={comentarios}
                                  keyExtractor={(item) => item.idcomentario.toString()}
                                  scrollEnabled={false}
                                  renderItem={({ item }) => {

                                    const numeroDeComentarios = numComentariosComentarios[item.idcomentario.toString()];
                                    

                                    return (
                                      <Comentario disciplina = {disciplina} comentario = {item} pesquisaNavegacao= {pesquisaNavegacao} tamanhoHorizontal = {72} numComentarios = {numeroDeComentarios} navigation = {navigation}></Comentario>
                                    )
                                    
                                  }
                                  
                                    

                                }
                                />
                                
                            </>
                          )}
                          
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
    alignItems: 'center'
    
  },

  barraTopo: {
    backgroundColor: '#D9D9D9',
    width: '90%',
    height: '10%',
    display:'flex',
    marginLeft:'5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  respostas: {
    height: vh(4.3),
    width: vw(83),
    backgroundColor: '#336699',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3%',
    
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

  criarComentario:{
    backgroundColor: 'white',
    width: vw(35),
    height: vh(6),
    borderRadius: 20,
    fontSize: 15,
    fontWeight: 'bold',
    display: 'flex',
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',   
  }
});
