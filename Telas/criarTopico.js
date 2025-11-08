import { View, Text, ScrollView, StyleSheet,Button,Image, TextInput,TouchableOpacity, Touchable, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { vh, vw } from 'react-native-css-vh-vw';
import { useState, useContext,useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js'
import {IdContext} from '../App'
import { useRoute } from '@react-navigation/native';


export default function CriarTopico({navigation}){
  
  const agora = new Date().toLocaleString('af-ZA',{timeZone: 'America/Sao_Paulo'});
  console.log(agora.slice(0,20).replaceAll('/','-').replace(',',''));
  const route = useRoute();
  const {item} = route.params;
  const[titulo,setTitulo] = useState('');
  const[conteudo,setConteudo]= useState('');
  const[horario,setHorario] = useState(agora.slice(0,20).replaceAll('/','-').replace(',',''));
  //const[data,setData] = useState(agora.toISOString().slice(0, 19).replace('T', ' '));
  //console.log(data);
  const[imagem,setImagem] = useState('');
  const[idUsuario,setIdUsuario] = useContext(IdContext);
  const[codDisciplina,setCodDisciplina] = useState(item.codDisciplina);
  const[nome,setNome] = useState('');

  const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
  const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
  const supabase = createClient(supabaseUrl, supabaseKey)


  
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
    
  
  async function handleInsert(){
      if(conteudo == '' || titulo == ''){
        Alert.alert('Os campos devem estar preenchidos!');
        console.log('Os campos devem estar preenchidos!');
      }
      else{
        const { data, error } = await supabase
        .from('topico')
        .insert([{ conteudotexto: conteudo, conteudoimg: imagem, titulotopico: titulo, fk_usuario_idusuario: idUsuario, fk_disciplina_coddisciplina: codDisciplina }])
                
        if (error) console.error(error)
        else{
          Alert.alert('Topico Criado com sucesso!');
          console.log('Topico Criado com sucesso!');
          navigation.goBack();
        }
      }
          
  }
  
  return(
        <>
            <View style = {styles.container}>

                <View style = {styles.barraTopo}>
                    <View style = {styles.usuario}>
                
                        <Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />
                        <TouchableOpacity onPress={()=>navigation.navigate('Perfil')}>
                            <Text style = {{fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 15, display: 'flex',alignItems: 'center'}}>
                                        {nome.length > 10 ? nome.substring(0, 10) + '...' : nome}
                            </Text>
                        </TouchableOpacity>
                    </View>
                
                    <View style = {{display: 'flex', width: '42%', alignItems: 'center', flexDirection: 'row',height: "60%", borderRadius: 10, backgroundColor: 'white', marginLeft: '5%'}}>
                        <TextInput style = {{width: '80%'}} />
                        <Image source = {require("../assets/icones/iconeLupa.png")}
                        style = {{width: 20, height: 20}}/>
                    </View>
                
                    <Image source = {require("../assets/icones/menuLateral.png")}
                    style = {{ width: 40,height:40, marginLeft: '7%'}}/>
                </View>
                

                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                   <View style = {{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>

                        <Text style = {{color: 'white',fontSize: 25, fontWeight: 'bold',paddingVertical:'20px'}}>{item.nomedisciplina}</Text>

                   </View> 

                    <View style = {{width: vw(91),height:vh(71),backgroundColor: '#336699',borderRadius: '27px',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                        <View style = {{width: vw(90), height: vh(64),backgroundColor: '#D9D9D9',display: 'flex', flexDirection: 'column',justifyContent: 'space-evenly',alignItems: 'center'}}>
                          <Text style = {styles.titulo}>Título do Tópico</Text>
                          <TextInput style = {styles.inputTitulo} value={titulo} onChangeText={setTitulo}/>
                          <Text style = {styles.titulo}>Conteúdo da postagem</Text>
                          <TextInput  multiline={true} style = {styles.inputConteudo} value={conteudo} onChangeText={setConteudo}/>
                          <TouchableOpacity style = {styles.anexarImagem}>
                            <Text  style = {{color: '#0066FF'}}>Anexar Imagens</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style = {styles.criarTopico} onPress={() => {handleInsert()}}>
                            <LinearGradient style={[{height:"100%", width:'100%', alignItems: 'center', justifyContent:'space-around', flexDirection:'row', borderRadius:20}]} colors={['#0066FF','#00AACC']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                              <Text style={{color:'white'}}>Criar Tópico</Text>
                            </LinearGradient>
                          </TouchableOpacity>

                        </View>
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

   barraTopo: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '10%',
    boxShadow: '0px 0px 5px 0px black',
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  usuario:{
    display:'flex',
    flexDirection: 'row',
    gap: '5%',
    alignItems: 'center',
  },

  medalha:{
    width: 35,
    height: 40,
    objectFit: 'contain',
    
  },

  tela: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    display:'flex',
    alignItems: 'center'
  },

  titulo: {

    fontWeight: 'bold',
    fontSize: 16,

  },

  inputTitulo:{

    width: vw(77),
    paddingHorizontal:vw(4),
    height: vh(5),
    backgroundColor: 'white',
    borderRadius: 13,
  

  },

  inputConteudo:{

    width: vw(77),
    height: vh(27),
    padding: vw(4),
    backgroundColor: 'white',
    borderRadius: 13,
    textAlignVertical: 'top'

  },

  anexarImagem:{

    width: vw(53),
    height: vh(5),
    backgroundColor: '#D9D9D9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
     borderColor: '#0066FF' 

  },

  criarTopico:{

     width: vw(53),
    height: vh(5),
    backgroundColor: '#D9D9D9',

  },

});
