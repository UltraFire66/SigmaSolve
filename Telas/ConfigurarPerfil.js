import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';


export default function ConfigurarPerfil({navigation}){

    return(
        <>
            <View style = {styles.container}>
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                    <View style = {{width: '90%', marginLeft:'5%', marginVertical: '10%',gap:'50px', display:'flex',flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style = {{width: '10%',backgroundColor: '#D9D9D9', borderRadius: '20px', paddingHorizontal: '30px', paddingVertical: '5px', display: 'flex', alignItems: 'center'}} onPress={() => navigation.navigate('Perfil')}>
                            <Image source = {require("../assets/icones/iconeSetaEsquerda.png")}
                            style = {{width: '30px', height: '30px'}}/>
                        </TouchableOpacity>

                        <Text style = {{fontSize: 20,fontWeight:'bold',color: 'white'}}>Configurações</Text>
                    </View>

                    <View style = {styles.campo}>

                        <Text style = {styles.textoCampo}>Nome:</Text>
                        <TextInput style = {styles.inputCampo}/>

                    </View>

                    <View style = {styles.campo}>

                        <Text style = {styles.textoCampo}>Nova senha:</Text>
                        <TextInput style = {styles.inputCampo}/>

                    </View>

                    <View style = {styles.campo}>

                        <Text style = {styles.textoCampo}>Confirmar senha:</Text>
                        <TextInput style = {styles.inputCampo}/>

                    </View>

                <View style = {{width: '100%',display: 'flex', justifyContent: 'center',alignItems: 'center',marginTop: '20px'}} >

                    <TouchableOpacity style = {styles.botao}>
                        <Text style = {{fontSize: 20,fontWeight: 'bold'}}>Salvar</Text>
                    </TouchableOpacity>

                </View>

                </LinearGradient>
            </View>
            
        </>
    )

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    
  },

  tela: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    display:'flex',
    justifyContent: 'flex-start'
  },
  
  campo: {

    display: 'flex',
    flexDirection: 'column',
    marginLeft: '15px',
    gap:'10px',
    marginVertical: '5%',
  },

  textoCampo:{

    width: '70%',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },

  inputCampo:{

    width: '70%',
    height: '30px',
    backgroundColor: 'white',
    borderRadius: '20px',
  },

  botao:{

    width: '50%',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: '30px',

  },


});
