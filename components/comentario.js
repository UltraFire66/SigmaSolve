import {Text,Modal,View, StyleSheet, Image, Touchable, TouchableOpacity, Linking} from 'react-native';
import { useState,useEffect,useContext} from 'react';
import { vh, vw } from 'react-native-css-vh-vw';
import { supabase } from '../context/supabase';
import { userID } from '../context/idUsuario';
import { Feather } from '@expo/vector-icons';

function Comentario(props){

  const [idUsuario,setIdUsuario] = useContext(userID)
  const [medalhaBronze, setMedalhaBronze] = useState(false)
  const [medalhaPrata, setMedalhaPrata] = useState(false)
  const [medalhaOuro, setMedalhaOuro] = useState(false)
  const [medalhaMax, setMedalhaMax] = useState(false)
  const [likeDado,setLikeDado] = useState(false);
  const [deuLike,setDeuLike] = useState(0);
  const [comentarios,setComentarios] = useState([]);

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

    if(data)
      setLikeDado(true);
    else
      setLikeDado(false);

    

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
    console.log(props.comentario)

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
        
        <View style = {styles.fundo}>
          <View style = {styles.usuario}>

            {medalhaBronze && (<Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />)}
            {medalhaPrata && (<Image source = {require("../assets/medalhas/medalhaPrata.png")} style={styles.medalha} />)}
            {medalhaOuro && (<Image source = {require("../assets/medalhas/medalhaOuro.png")} style={styles.medalha} />)}
            {medalhaMax && (<Image source = {require("../assets/medalhas/medalhaMaxima.png")} style={styles.medalha} />)}
              <Text style = {{fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 13, display: 'flex',alignItems: 'center'}}>{props.comentario.usuario.nome}</Text>
          
          </View>

          <Text style = {{fontSize: 14,fontWeight: 'bold',width: '95%',padding:'5%'}}>{props.comentario.conteudotexto}</Text>
          
          <View style = {{display:'flex',justifyContent:'center', alignItems: 'center'}}>
              {props.comentario.conteudoimg && <Image source={{uri: props.comentario.conteudoimg}} resizeMode="stretch" style = {{width:vw(50),height: vh(20)}}/>}
              {props.comentario.urlPDF && 
                <TouchableOpacity onPress = {() => Linking.openURL(props.comentario.urlPDF)}>
                  <Feather name = 'file-text' size={100} color="black" />
                  <Text style={{ fontWeight: "bold", marginBottom: 10, textAlign: 'center' }}>
                    {props.comentario.nomePdf}
                  </Text>
                </TouchableOpacity>
              }
          </View>

          <View style = {styles.opcoes}>
              <TouchableOpacity style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
              
              <Image source = {require("../assets/icones/iconeComentarioPreto.png")} resizeMode="cover"
              style = {{width:32,height: 32,marginTop: 3,marginLeft: '3%'}}/>
              <Text style = {{color: 'black',fontSize: 13}}>{comentarios.length}</Text>

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
    marginVertical: vh(2)
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
