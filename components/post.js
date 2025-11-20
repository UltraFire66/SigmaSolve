import {Text,View, StyleSheet, Image, Modal, Touchable, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { vh, vw } from 'react-native-css-vh-vw';
import { createClient } from '@supabase/supabase-js'

import { useState,useContext } from 'react';
import { IdContext } from '../App';

function Post(props){

    const [modalVisible,setModalVisible] = useState(false);

    const [checaDenuncia,setChecaDenuncia] = useState();
    const [carregandoDenuncia,setCarregandoDenuncia] = useState(false);

    const [textoDenuncia,setTextoDenuncia] = useState();

    const [comentarios,setComentarios] = useState([]);
    
    const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
    const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
    const supabase = createClient(supabaseUrl, supabaseKey)
    const[idUsuario,setIdUsuario] = useContext(IdContext);


    

    async function buscaComentario(){

      setModalVisible(true);

      const { data, error } = await supabase
              .from('comentario')
              .select('*',{count: 'exact'})
              .eq('fk_topico_idtopico', props.post.idtopico)
        
      setComentarios(data);
    
    }

    async function procuraDenuncia(){
       const { data, error} = await supabase
        .from('denunciatopico')
        .select('*')
        .eq('fk_usuario_idusuario', idUsuario)
        .eq('fk_topico_idtopico', props.post.idtopico)
        .maybeSingle()

        console.log(data);

        if(data)
          setTextoDenuncia('Deseja retirar a denúncia?');        
        else
          setTextoDenuncia('Deseja fazer a denúncia?');

        setChecaDenuncia(data);
        setCarregandoDenuncia(false);
    }

    async function realizarDenuncia(){
      
        const { data, error } = await supabase
          .from('denunciatopico')
          .insert([{ flagdenuncia: true, fk_usuario_idusuario: idUsuario, fk_topico_idtopico: props.post.idtopico}])
          if (error) console.error(error)
          else{
            Alert.alert('Denúncia cadastrada com sucesso!')
            //setar modal falso fechar
          }
   
    }

    async function retirarDenuncia(){

      const { data, error } = await supabase
        .from('denunciatopico')
          .delete()
          .eq('iddenuncia', checaDenuncia.iddenuncia)
          if (error) console.error(error)
          else{
            Alert.alert('Denúncia retirada com sucesso!')
            //setar modal falso fechar
          }
          
          

       

    }

    function funcaodoSim(){

       setModalVisible(false); 

      if(checaDenuncia){
     
        retirarDenuncia();

      }
      else{
     
        realizarDenuncia();

      }

    }
    

    
    return(
        <>
            <View style = {styles.criarTopico}>
              <View style = {styles.topo}>
                
                <View style = {styles.usuario}>
                  <Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />
                  <Text style = {{fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 10, display: 'flex',alignItems: 'center', marginBottom: 5}}>{props.post.usuario.nome}</Text>
                </View>

                <Text style = {{fontSize: 13,color: 'black', opacity: 0.5}}>Há duas horas</Text>

                <TouchableOpacity onPressOut={() => { setCarregandoDenuncia(true),procuraDenuncia(), setModalVisible(true)}}>
                  <Image source = {require("../assets/icones/iconeDenuncia.png")}
                  style = {{width:20,height: 20,marginRight: 3}} />
                </TouchableOpacity>
                <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                >
                  <TouchableOpacity style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', width:vw(100), height: vh(100)}} onPressOut={() => setModalVisible(false)}>                  
                  </TouchableOpacity>
                 

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
                        <TouchableOpacity style={{backgroundColor:'#E04083', paddingVertical:vh(1.5), paddingHorizontal:vw(5), borderRadius:15}} onPressOut={()=>{setChecaDenuncia(),setModalVisible(false)}}>
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

              <Text style = {{fontSize: 14,fontWeight: 'bold',width: '95%',padding:'5%'}}
              >{props.post.conteudotexto}</Text>
              {props.post.conteudoimg && (<Image source={{uri: props.post.conteudoimg}} resizeMode='stretch' style={{width:vw(50), height:vh(20), marginBottom:vh(1)}}/>)}
            </View>
            <View style = {styles.respostas}>

              <TouchableOpacity onPress={buscaComentario} style = {{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginLeft: 10}}>

                <Image source = {require("../assets/icones/iconeComentario.png")}
                style = {{width:22,height: 22,marginTop: 3,marginLeft: '3%'}}/>
                <Text style = {{color: 'white',fontSize: 13}}>52</Text>

              </TouchableOpacity>
         
            </View>

        </>
    )
}

export default Post;

const styles = StyleSheet.create({
  
  criarTopico: {
    marginTop: '10%',
    width:vw(84),
    height:'auto',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: "column",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: 'center',
    
  },
  topo:{

    width: '95%',
    display: 'flex',
    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '2%'
  },

   usuario:{
    display:'flex',
    flexDirection: 'row',
    gap: '5%',
   
  },

  medalha:{
    width: 25,
    height: 30,
    objectFit: 'contain',
    
  },

  respostas: {
    height: vh(4.3),
    width: vw(84),
    backgroundColor: '#336699',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3%',
    
  }
});
