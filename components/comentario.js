import {Text,Modal,View, StyleSheet, Image, Touchable, TouchableOpacity} from 'react-native';
import { useState,useEffect,useContext} from 'react';
import { vh, vw } from 'react-native-css-vh-vw';
import { createClient } from '@supabase/supabase-js';
import {IdContext} from '../App';

function Comentario(props){
  
  const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
  const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
  const supabase = createClient(supabaseUrl, supabaseKey)
  const[idUsuario,setIdUsuario] = useContext(IdContext);

  const [medalhaBronze, setMedalhaBronze] = useState(false)
  const [medalhaPrata, setMedalhaPrata] = useState(false)
  const [medalhaOuro, setMedalhaOuro] = useState(false)
  const [medalhaMax, setMedalhaMax] = useState(false)

  const [likeDado,setLikeDado] = useState();
  const[comentarios,setComentarios] = useState([]);

  async function buscaComentarios(){

      //setModalVisible(true);

      const { data, error } = await supabase
              .from('comentario')
              .select('*',{count: 'exact'})
              .eq('fk_topico_idtopico', props.comentario.idcomentario)
        
      setComentarios(data);
      
    }

  async function darLike(){

     const { data, error } = await supabase
        .from('rating')
        .insert([{ flagcurtida: 1, fk_usuario_idusuario: idUsuario , fk_comentario_idcomentario: props.comentario.idcomentario }])

  }

  useEffect(() =>{

    buscaComentarios();
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
        <>
           <View style = {styles.fundo}>
                <View style = {styles.usuario}>

                  {medalhaBronze && (<Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />)}
                  {medalhaPrata && (<Image source = {require("../assets/medalhas/medalhaPrata.png")} style={styles.medalha} />)}
                  {medalhaOuro && (<Image source = {require("../assets/medalhas/medalhaOuro.png")} style={styles.medalha} />)}
                  {medalhaMax && (<Image source = {require("../assets/medalhas/medalhaMaxima.png")} style={styles.medalha} />)}
                    <Text style = {{fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 13, display: 'flex',alignItems: 'center'}}>{props.comentario.usuario.nome}</Text>
                
                </View>

                <Text style = {{fontSize: 14,fontWeight: 'bold',width: '95%',padding:'5%'}}
              >{props.comentario.conteudotexto}</Text>
            
                <View style = {styles.opcoes}>
                    <TouchableOpacity style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
                    
                    <Image source = {require("../assets/icones/iconeComentarioPreto.png")} resizeMode="cover"
                    style = {{width:32,height: 32,marginTop: 3,marginLeft: '3%'}}/>
                    <Text style = {{color: 'black',fontSize: 13}}>{comentarios.length}</Text>

                  </TouchableOpacity>

                  <TouchableOpacity style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>
                    
                    <Image source = {require("../assets/icones/iconeLike.png")}
                    style = {{width:22,height: 22,marginTop: 3,marginLeft: '3%'}}/>
                    <Text style = {{color: 'black',fontSize: 13}}>{props.comentario.likes}</Text>

                  </TouchableOpacity>
                </View>
           </View>
        </>
    )
}

export default Comentario;


const styles = StyleSheet.create({
  
  fundo:{

   
    width: vw(72),
    backgroundColor: '#D9D9D9',
    borderRadius: 27,
    display: 'flex',
    flexDirection: 'column'
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
