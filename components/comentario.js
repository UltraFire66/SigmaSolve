import {Text,Modal,View, StyleSheet, Image, Touchable, TouchableOpacity} from 'react-native';
import { useState,useEffect,useContext} from 'react';
import { vh, vw } from 'react-native-css-vh-vw';
import { createClient } from '@supabase/supabase-js';
import { userID } from '../context/idUsuario';

function Comentario(props){
  
  const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
  const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
  const supabase = createClient(supabaseUrl, supabaseKey)
  const [idUsuario,setIdUsuario] = useContext(userID)

  const [medalhaBronze, setMedalhaBronze] = useState(false)
  const [medalhaPrata, setMedalhaPrata] = useState(false)
  const [medalhaOuro, setMedalhaOuro] = useState(false)
  const [medalhaMax, setMedalhaMax] = useState(false)

  const [likeDado,setLikeDado] = useState(false);
  const [like,setLike]=useState();
  const [deuLike,setDeuLike] = useState(0);
  const [comentarios,setComentarios] = useState([]);
<<<<<<< HEAD
=======
  const [modalDenunciaVisible,setmodalDenunciaVisible] = useState(false);
  const [checaDenuncia,setChecaDenuncia] = useState();
  const [carregandoDenuncia,setCarregandoDenuncia] = useState(false);
  const [textoDenuncia,setTextoDenuncia] = useState();
  const [tamanhoHorizontal,setTamanhoHorizontal] = useState(72);
>>>>>>> 0347502cb6611090427ef6f615a0de7b14ab0559

  async function buscaComentarios(){


      const { data, error } = await supabase
              .from('comentario')
              .select('*',{count: 'exact'})
              .eq('fk_topico_idtopico', props.comentario.idcomentario)
      
      console.log(data);
      setComentarios(data);
      
    }

  async function buscaLike(){

    const { data, error } = await supabase
              .from('rating')
              .select('*',{count: 'exact'})
              .eq('fk_usuario_idusuario', idUsuario )
              .eq('fk_comentario_idcomentario', props.comentario.idcomentario)
              .maybeSingle()


    if(data){
      setLikeDado(true);

    }
    else{
      setLikeDado(false);
   
    }
      

    

  }

  


  async function darLike(){

    const { data:cria, error:erroCria } = await supabase
    .from('rating')
    .insert([{ flagcurtida: 1, fk_usuario_idusuario: idUsuario , fk_comentario_idcomentario: props.comentario.idcomentario }])
    
    console.log("criou o like");
    
    const { data:insereUsuario, error:erroInsereUsuario } = await supabase
    .from('usuario')
    .update({likes: (props.comentario.usuario.likes + 1)})
    .eq('idusuario', props.comentario.usuario.idusuario)
    .select()    

    console.log("alterou likes do usuario");

    const { data:insereComentario, error:erroInsereComentario } = await supabase
    .from('comentario')
    .update({likes: (props.comentario.likes + 1)})
    .eq('idcomentario', props.comentario.idcomentario)
    .select()  

    console.log("alterou likes do comentario");
    setLikeDado(true);
    setDeuLike(1);
    
   
  }

  async function tirarLike(){

    const { data:cria, error:erroCria } = await supabase
    .from('rating')
    .delete()
    .eq('fk_usuario_idusuario', idUsuario)
    .eq('fk_comentario_idcomentario',props.comentario.idcomentario)
    
    console.log("deletou o like");
    
    const { data:insereUsuario, error:erroInsereUsuario } = await supabase
    .from('usuario')
    .update({likes: (props.comentario.usuario.likes - 1)})
    .eq('idusuario', props.comentario.usuario.idusuario)
    .select()    

    console.log("tirou likes do usuario");

    const { data:insereComentario, error:erroInsereComentario } = await supabase
    .from('comentario')
    .update({likes: (props.comentario.likes - 1)})
    .eq('idcomentario', props.comentario.idcomentario)
    .select()  

    console.log("tirou likes do comentario");
    setLikeDado(false);
    setDeuLike((-1));
    
      
  }


  useEffect(() =>{

    buscaComentarios();
    buscaLike()
<<<<<<< HEAD
    console.log(props.comentario)
=======

    //console.log(props.comentario)
>>>>>>> 0347502cb6611090427ef6f615a0de7b14ab0559

    if((props.tamanhoHorizontal))
      setTamanhoHorizontal(props.tamanhoHorizontal)
      

    if(props.comentario.usuario.likes > 15){
      setMedalhaMax(true)
    }else if(props.comentario.usuario.likes.likes > 10){
      setMedalhaOuro(true)
    }else if(props.comentario.usuario.likes.likes > 5){
      setMedalhaPrata(true)
    }else{
      setMedalhaBronze(true)
    }

  },[])

    return(
        
<<<<<<< HEAD
           <View style = {styles.fundo}>
                <View style = {styles.usuario}>
=======
        <View style = {[styles.fundo,{width:vw(tamanhoHorizontal)}]}>
          <View style = {styles.usuario}>
>>>>>>> 0347502cb6611090427ef6f615a0de7b14ab0559

                  {medalhaBronze && (<Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />)}
                  {medalhaPrata && (<Image source = {require("../assets/medalhas/medalhaPrata.png")} style={styles.medalha} />)}
                  {medalhaOuro && (<Image source = {require("../assets/medalhas/medalhaOuro.png")} style={styles.medalha} />)}
                  {medalhaMax && (<Image source = {require("../assets/medalhas/medalhaMaxima.png")} style={styles.medalha} />)}
                    <Text style = {{fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 13, display: 'flex',alignItems: 'center'}}>{props.comentario.usuario.nome}</Text>
                
                </View>

<<<<<<< HEAD
                <Text style = {{fontSize: 14,fontWeight: 'bold',width: '95%',padding:'5%'}}
              >{props.comentario.conteudotexto}</Text>
=======
              <View style={{backgroundColor:'white', borderWidth:3, borderColor:'#D9D9D9', position: 'absolute', width: vw(90), height: vh(20), right: vw(5), top: vh(40), borderRadius:35, display: 'flex', alignItems:'center', justifyContent:'center', gap:vh(5)}}>
                  {carregandoDenuncia ? (<ActivityIndicator size = 'large' color="#000000"/>) :
                ( 
                  <>
                    <Text style={{fontWeight:600, fontSize:18, textAlign:'center'}}>{textoDenuncia}</Text>
                    <View style={{display:'flex', flexDirection:'row', gap:vw(15)}}>
                      
                      <TouchableOpacity style={{backgroundColor:'#78ABC6', paddingVertical:vh(1.5), paddingHorizontal:vw(5), borderRadius:15}} onPressOut={()=>{funcaodoSim()}}>
                        <Text style={{fontWeight:600, fontSize:18, color:'white'}}>
                          Sim
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{backgroundColor:'#E04083', paddingVertical:vh(1.5), paddingHorizontal:vw(5), borderRadius:15}} onPressOut={()=>{setChecaDenuncia(),setmodalDenunciaVisible(false)}}>
                        <Text style={{fontWeight:600, fontSize:18, color:'white'}}>
                          Não
                        </Text>
                      </TouchableOpacity>
                    </View>
                    </>
                    )
                }
              </View>
            </Modal>


          </View>

          <Text style = {{fontSize: 14,width: '95%',padding:'5%'}}>{props.comentario.conteudotexto}</Text>
          
          <View style = {{display:'flex',justifyContent:'center', alignItems: 'center'}}>
              {props.comentario.conteudoimg && <Image source={{uri: props.comentario.conteudoimg}} resizeMode="stretch" style = {{width:vw(50),height: vh(20)}}/>}
              {props.comentario.urlPDF && 
                <TouchableOpacity onPress = {() => Linking.openURL(props.comentario.urlPDF)}>
                  <Feather name = 'file-text' size={100} color="black" />
                  <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                    {props.comentario.nomePdf}
                  </Text>
                </TouchableOpacity>
              }
          </View>

          <View style = {styles.opcoes}>
              <TouchableOpacity style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}} onPress={()=>props.navigation.navigate('VerComentario', {comentario: props.comentario,disciplina: props.disciplina,numComentarios: props.numComentarios})}>
>>>>>>> 0347502cb6611090427ef6f615a0de7b14ab0559
              
              <view style = {{width:'100%',height:"100%",display:'flex',justifyContent:'center'}}>

                 {props.comentario.conteudoimg && <Image source={{uri: props.comentario.conteudoimg}} resizeMode="stretch" style = {{width:vw(50),height: vh(20)}}/>}

              </view>

<<<<<<< HEAD
                <View style = {styles.opcoes}>
                    <TouchableOpacity style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
                    
                    <Image source = {require("../assets/icones/iconeComentarioPreto.png")} resizeMode="cover"
                    style = {{width:32,height: 32,marginTop: 3,marginLeft: '3%'}}/>
                    <Text style = {{color: 'black',fontSize: 13}}>{comentarios.length}</Text>
=======
            <TouchableOpacity onPressOut =  {()=> {tirarLike()}} style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
              
              <Image source = {require("../assets/icones/iconeLikePreenchido.png")}
              style = {{width:22,height: 22,marginTop: 3,marginLeft: '3%'}}/>
              <Text style = {{color: 'black',fontSize: 13}}>{like}</Text>
>>>>>>> 0347502cb6611090427ef6f615a0de7b14ab0559

                  </TouchableOpacity>

                  {likeDado ? (

                  <TouchableOpacity onPress =  {()=> {tirarLike()}} style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
                    
                    <Image source = {require("../assets/icones/iconeLikePreenchido.png")}
                    style = {{width:22,height: 22,marginTop: 3,marginLeft: '3%'}}/>
                    <Text style = {{color: 'black',fontSize: 13}}>{props.comentario.likes + deuLike}</Text>

                  </TouchableOpacity>


                  ) :
                  
                  (

<<<<<<< HEAD
                  <TouchableOpacity onPress =  {()=> {darLike()}} style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
                    
                    <Image source = {require("../assets/icones/iconeLike.png")}
                    style = {{width:22,height: 22,marginTop: 3,marginLeft: '3%'}}/>
                    <Text style = {{color: 'black',fontSize: 13}}>{props.comentario.likes + deuLike}</Text>
=======
            <TouchableOpacity onPressOut =  {()=> {darLike()}} style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
              
              <Image source = {require("../assets/icones/iconeLike.png")}
              style = {{width:22,height: 22,marginTop: 3,marginLeft: '3%'}}/>
              <Text style = {{color: 'black',fontSize: 13}}>{like}</Text>
>>>>>>> 0347502cb6611090427ef6f615a0de7b14ab0559

                  </TouchableOpacity>

                  )}
                </View>
           </View>
        
    )
}

export default Comentario;


const styles = StyleSheet.create({
  
  fundo:{

   
    width: vw(72),
    backgroundColor: '#D9D9D9',
    borderRadius: 27,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: vh(0.5)
  },
  
   usuario:{
    display:'flex',
    flexDirection: 'row',
    gap: '2%',
    alignItems:'center',
  
  },

  medalha:{
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
