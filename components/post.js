import {Text,View, StyleSheet, Image, Modal, Touchable, TouchableOpacity} from 'react-native';
import { vh, vw } from 'react-native-css-vh-vw';
import { createClient } from '@supabase/supabase-js'

import { useState,useEffect } from 'react';

function Post(props){

    const [modalVisible,setModalVisible] = useState(false);

    const [comentarios,setComentarios] = useState([]);
    
    const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
    const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
    const supabase = createClient(supabaseUrl, supabaseKey)

    async function buscaComentario(){

      setModalVisible(true);

      const { data, error } = await supabase
              .from('comentario')
              .select('*',{count: 'exact'})
              .eq('fk_topico_idtopico', props.post.idtopico)
        
      setComentarios(data);
    
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

                <Image source = {require("../assets/icones/iconeDenuncia.png")}
                style = {{width:20,height: 20,marginRight: 3}} />


              </View>

              <Text style = {{fontSize: 14,fontWeight: 'bold',width: '95%',padding:'5%'}}
              >{props.post.conteudotexto}</Text>

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
