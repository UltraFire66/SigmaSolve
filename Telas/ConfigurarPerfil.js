import { View, Text, ScrollView, StyleSheet,Button,Image, TextInput,TouchableOpacity, Touchable, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { useState, useContext, useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js'
import { userID } from '../context/idUsuario';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ConfigurarPerfil({navigation}){
    const [idUsuario,setIdUsuario] = useContext(userID)
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senha1, setSenha1] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [ocultarSenha, setOcultarSenha] = useState(true);
    const [ocultarSenha1, setOcultarSenha1] = useState(true);
    const [ocultarSenha3, setOcultarSenha3] = useState(true);
    const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
    const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    async function handleInsert() {
      if(senhaAtual.length > 0){
        const { data, error } = await supabase
              .from('usuario')
              .select('*')
              .eq('idusuario', idUsuario)
              .eq('senha', senhaAtual)
              .maybeSingle()
        if(data){
            if(senha == '' && senha1 ==''){
            const { data, error } = await supabase
                .from('usuario')
                .update({nome: nome})
                .eq('idusuario', idUsuario)
                .select()
            if (error) console.error(error)
            else{
                Alert.alert('Dados atualizados com sucesso!')
                navigation.navigate('Perfil')
            }
          }else if(nome.length > 0){
            if (senha.length >= 6 && senha.length <= 30){
              if (senha === senha1){
                const { data, error } = await supabase
                  .from('usuario')
                  .update({ senha: senha, nome: nome})
                  .eq('idusuario', idUsuario)
                  .select()
                if (error) console.error(error)
                else{
                  Alert.alert('Dados atualizados com sucesso!')
                  navigation.navigate('Perfil')
                }
              }else Alert.alert('As senhas não conferem.')
            }else Alert.alert('A senha deve ter entre 6 e 30 caracteres.')
          }else if(nome == ''){
            if (senha.length >= 6 && senha.length <= 30){
              if (senha === senha1){
                const { data, error } = await supabase
                  .from('usuario')
                  .update({ senha: senha})
                  .eq('idusuario', idUsuario)
                  .select()
                if (error) console.error(error)
                else{
                  Alert.alert('Dados atualizados com sucesso!')
                  navigation.navigate('Perfil')
                }
              }else Alert.alert('As senhas não conferem.')
            }else Alert.alert('A senha deve ter entre 6 e 30 caracteres.')
          }
        }else Alert.alert('A senha atual está incorreta.')
      }else Alert.alert('A senha atual está incorreta.')
        
        
    }

    async function buscaNome(){
      const { data, error } = await supabase
              .from('usuario')
              .select('*')
              .eq('idusuario', idUsuario)
      setNome(data[0].nome)
      console.log(data[0].nome)
    }

    useEffect(() => {
        buscaNome()
    }, [])

    return(
        <SafeAreaView style = {styles.safeContainer}>
            <View style = {styles.container}>
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                    <View style = {{width: '90%', marginLeft:'5%', marginVertical: '10%',gap:50, display:'flex',flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style = {{width: '10%',backgroundColor: '#D9D9D9', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 5, display: 'flex', alignItems: 'center'}} onPress={() => navigation.goBack()}>
                            <Image source = {require("../assets/icones/iconeSetaEsquerda.png")}
                            style = {{width: 30, height: 30}}/>
                        </TouchableOpacity>

                        <Text style = {{fontSize: 20,fontWeight:'bold',color: 'white'}}>Configurações</Text>
                    </View>

                    <View style={{marginTop:"10%"}}>
                      <Text style={{color:'white', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Nome Completo</Text>
                      <TextInput value={nome} onChangeText={setNome} style={{width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%"}}/>
                      <Text style={{color:'white', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Senha Atual</Text>
                      <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <TextInput style={{width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%",paddingRight: 40}} secureTextEntry={ocultarSenha3} value={senhaAtual} onChangeText={setSenhaAtual}/>
                        <TouchableOpacity style={{position:'absolute', marginLeft:"85%"}} onPress={() => setOcultarSenha3(!ocultarSenha3)}>
                          <Feather name={ocultarSenha3 ? 'eye-off' : 'eye'} size={22} color="#555" />
                        </TouchableOpacity>
                      </View>
                      <Text style={{color:'white', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Nova Senha</Text>
                      <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <TextInput style={{width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%",paddingRight: 40}} secureTextEntry={ocultarSenha} value={senha} onChangeText={setSenha}/>
                        <TouchableOpacity style={{position:'absolute', marginLeft:"85%"}} onPress={() => setOcultarSenha(!ocultarSenha)}>
                          <Feather name={ocultarSenha ? 'eye-off' : 'eye'} size={22} color="#555" />
                        </TouchableOpacity>
                      </View>
                      <Text style={{color:'white', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Confimar Nova Senha</Text>
                      <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <TextInput style={{width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%",paddingRight: 40}} secureTextEntry={ocultarSenha1} value={senha1} onChangeText={setSenha1}/>
                        <TouchableOpacity style={{position:'absolute', marginLeft:"85%"}} onPress={() => setOcultarSenha1(!ocultarSenha1)}>
                          <Feather name={ocultarSenha1 ? 'eye-off' : 'eye'} size={22} color="#555" />
                        </TouchableOpacity>
                      </View>
                    </View>

                <View style = {{width: '100%',display: 'flex', justifyContent: 'center',alignItems: 'center',marginTop: 20}} >

                    <TouchableOpacity style = {styles.botao} onPress={() => {handleInsert()}}>
                        <Text style = {{fontSize: 20,fontWeight: 'bold'}}>Salvar</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white', marginTop: "10%"}}>O campo da senha atual deve ser obrigatoriamente preenchido para qualquer alteração. No entanto, pode-se alterar o nome ou a senha independentemente.</Text>
                </View>

                </LinearGradient>
            </View>
            
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  
  safeContainer:{
    flex: 1
  },
  
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
