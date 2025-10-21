import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';


export default function Home({navigation}){

    return(
        <>
            <View style = {styles.container}>
                <View style = {styles.barraTopo}>
                  <View style = {styles.usuario}>

                    <Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />
                    <Text style = {{fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 15, display: 'flex',alignItems: 'center'}}>Caio Rangel</Text>
                  </View>

                  <View style = {{display: 'flex', width: '42%', alignItems: 'center', flexDirection: 'row',height: "60%", borderRadius: '10px', backgroundColor: 'white', marginLeft: '8%'}}>
                    <TextInput style = {{width: '80%'}} />
                    <Image source = {require("../assets/icones/iconeLupa.png")}
                    style = {{width: '20px', height: '20px'}}/>
                  </View>

                  <Image source = {require("../assets/icones/menuLateral.png")}
                  style = {{ width: '40px',height:'40px', marginLeft: '7%'}}/>
                </View>

                
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                  <View style = {styles.topoTela}>

                  <Text style = {styles.titulo}>Física 3</Text>
                  
                  <TouchableOpacity style = {styles.criarTopico}><Text>criar Tópico</Text></TouchableOpacity>
                  

                  </View>

                  <Post></Post>  
                  <Post></Post>  
                  <Post></Post> 
                  <Post></Post>  

                </LinearGradient>
            </View>
            
        </>
    )

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',

    alignItems: 'center',
  },

  barraTopo: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '10%',
    boxShadow: '0px 0px 5px 0px black',
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    opacity: 1,
    marginBottom: '10%',
    marginTop: '5%'
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    marginLeft: '38%'
  },
  criarTopico: {

    backgroundColor: 'white',
    width: '25%',
    height: '90%',
    borderRadius: '20px',
    fontSize: 15,
    fontWeight: '400',
    display: 'flex',
    textAlign:'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    marginRight: '6%'
  },
  usuario:{
    display:'flex',
    flexDirection: 'row',
    gap: '5%',
   
  },

  medalha:{
    width: '35px',
    height: '40px',
    objectFit: 'contain',
    
  }
});
