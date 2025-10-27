import { View, Text, ScrollView, StyleSheet,Button,Image, TextInput,TouchableOpacity, Touchable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react'
import { Feather } from '@expo/vector-icons';

export default function Cadastro({navigation}){
    const [senha, setSenha] = useState('');
    const [ocultarSenha, setOcultarSenha] = useState(true); 
    return(
        <View style={[styles.container, {backgroundColor: 'pink'}]}>
          
          <View style={[styles.view1, {justifyContent: 'center', backgroundColor: "blue", width:"100%"}]}>
            <LinearGradient style={[styles.view1, {width:'100%', alignItems: 'center', justifyContent:'center'}]} colors={['#00AACC', '#0066FF']}>
                <View style={{backgroundColor: '#D9D9D9', height: "80%", width:"80%", borderRadius: 40}}>
                  <View style={{ alignItems:'center'}}>
                    <Image source={require('../assets/lupa.png')} style={{marginTop: "10%"}} />
                    <Text style={{color:'#0066FF', fontWeight: "bold"}}>SigmaSolve</Text>
                    <Text style={{color:'#00AACC', fontWeight: "bold"}}>A comunidade de estudos do CEFET!</Text>
                  </View>
                  <View>
                    <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Email Institucional</Text>
                    <TextInput style={{width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%"}}/>
                    <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Senha</Text>
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                      <TextInput style={{width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%",paddingRight: 40}} secureTextEntry={ocultarSenha} value={senha} onChangeText={setSenha}/>
                      <TouchableOpacity style={{position:'absolute', marginLeft:"85%"}} onPress={() => setOcultarSenha(!ocultarSenha)}>
                        <Feather name={ocultarSenha ? 'eye-off' : 'eye'} size={22} color="#555" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity style={{marginBottom:0, marginTop:"15%", marginLeft:"10%", height:"11%", width:'80%', alignItems: 'center', justifyContent:'center', borderRadius:10}} onPress={() => navigation.navigate('Home') }>
                    <LinearGradient style={[{height:"100%", width:'100%', alignItems: 'center', justifyContent:'space-around', flexDirection:'row', borderRadius:10}]} colors={['#0066FF','#00AACC']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                        <Text style={{color:'white'}}>Entrar</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={{height:"5%", marginTop:"2%"}} onPress={() => navigation.navigate('EsqueciSenha')}>
                    <Text style={{color:'#00AACC', marginLeft:"10%"}}>Esqueceu sua senha? <Text style={{ textDecorationLine: 'underline' }}>Clique aqui</Text></Text>
                  </TouchableOpacity>
                  <Text style={{color:'#00AACC', marginLeft:"10%",}}>Ainda não tem uma conta?</Text>
                  <TouchableOpacity style={{marginTop:"5%", marginLeft:"10%", height:"11%",width:'80%', borderColor:"#0066FF", borderWidth:1, alignItems: 'center', justifyContent:'center', borderRadius:10}} onPress={() => navigation.navigate('Cadastro')}> 
                        <Text style={{color:'#0066FF'}}>Criar Conta</Text>
                  </TouchableOpacity> 
                </View>
            </LinearGradient>
          </View>
            
        </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view1:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: "30%"
  }
});