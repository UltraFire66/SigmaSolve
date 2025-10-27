import { View, Text, ScrollView, StyleSheet,Button,Image, TextInput,TouchableOpacity, Touchable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js'



export default function ConfigurarPerfil({navigation}){
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senha1, setSenha1] = useState('');
    const [ocultarSenha, setOcultarSenha] = useState(true);
    const [ocultarSenha1, setOcultarSenha1] = useState(true);
    const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
    const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
    const supabase = createClient(supabaseUrl, supabaseKey)
    async function handleInsert() {
      if(senha == senha1 && senha.length >= 6){
        const { data, error } = await supabase
          .from('usuario')
          .update({ senha: senha, nome: nome})
          .eq('idusuario', '5')
          .select()
          
          if (error) console.error(error)
          else console.log('Usuário inserido:', data)
      }else{
        console.log('senhas não conferem')
      }
        
    }
    return(
        <>
            <View style = {styles.container}>
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                    <View style = {{width: '90%', marginLeft:'5%', marginVertical: '10%',gap:50, display:'flex',flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style = {{width: '10%',backgroundColor: '#D9D9D9', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 5, display: 'flex', alignItems: 'center'}} onPress={() => navigation.navigate('Perfil')}>
                            <Image source = {require("../assets/icones/iconeSetaEsquerda.png")}
                            style = {{width: 30, height: 30}}/>
                        </TouchableOpacity>

                        <Text style = {{fontSize: 20,fontWeight:'bold',color: 'white'}}>Configurações</Text>
                    </View>

                    <View style={{marginTop:"10%"}}>
                      <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Nome Completo</Text>
                      <TextInput value={nome} onChangeText={setNome} style={{width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%"}}/>
                      <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Nova Senha</Text>
                      <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <TextInput style={{width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%",paddingRight: 40}} secureTextEntry={ocultarSenha} value={senha} onChangeText={setSenha}/>
                        <TouchableOpacity style={{position:'absolute', marginLeft:"85%"}} onPress={() => setOcultarSenha(!ocultarSenha)}>
                          <Feather name={ocultarSenha ? 'eye-off' : 'eye'} size={22} color="#555" />
                        </TouchableOpacity>
                      </View>
                      <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Confimar Nova Senha</Text>
                      <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <TextInput style={{width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%",paddingRight: 40}} secureTextEntry={ocultarSenha1} value={senha1} onChangeText={setSenha1}/>
                        <TouchableOpacity style={{position:'absolute', marginLeft:"85%"}} onPress={() => setOcultarSenha1(!ocultarSenha1)}>
                          <Feather name={ocultarSenha1 ? 'eye-off' : 'eye'} size={22} color="#555" />
                        </TouchableOpacity>
                      </View>
                    </View>

                <View style = {{width: '100%',display: 'flex', justifyContent: 'center',alignItems: 'center',marginTop: 20}} >

                    <TouchableOpacity style = {styles.botao} onPress={() => {handleInsert(); navigation.navigate('Perfil')}}>
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
    alignItems:'center',
    flexDirection: 'column',
    marginLeft: 15,
    gap:10,
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
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
  },

  botao:{

    width: '50%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 30,

  },


});
