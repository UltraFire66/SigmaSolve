import {Text,View, StyleSheet, Image} from 'react-native';
import { vh, vw } from 'react-native-css-vh-vw';

function Post(props){
  
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
              {props.post.conteudoimg && (<Image source={{uri: props.post.conteudoimg}} resizeMode='stretch' style={{width:vw(50), height:vh(20), marginBottom:vh(1)}}/>)}
            </View>
            <View style = {styles.respostas}>

              <Image source = {require("../assets/icones/iconeComentario.png")}
              style = {{width:22,height: 22,marginTop: 3,marginLeft: '3%'}}/>
              <Text style = {{color: 'white',fontSize: 13}}>52</Text>

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
