import { View, Text, ScrollView, StyleSheet,Button,Image, TextInput,TouchableOpacity, Touchable, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { vh, vw } from 'react-native-css-vh-vw';
import { React, useState, useContext,useEffect } from 'react'
import { supabase } from '../context/supabase';
import { userID } from '../context/idUsuario';
import Menu from '../components/menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';


export default function AdicionarDisciplina({navigation}){
  const[codDisciplina,setCodDisciplina] = useState('');
  const[nomeDisciplina,setNomeDisciplina]= useState('');
  const[idUsuario,setIdUsuario] = useContext(userID);
  const route = useRoute();
  const [nome,setNome] = useState('');
  const [medalhaBronze, setMedalhaBronze] = useState(false)
  const [medalhaPrata, setMedalhaPrata] = useState(false)
  const [medalhaOuro, setMedalhaOuro] = useState(false)
  const [medalhaMax, setMedalhaMax] = useState(false)

  async function buscaNome(){
    const { data, error } = await supabase
            .from('usuario')
            .select('*')
            .eq('idusuario', idUsuario)
    setNome(data[0].nome)
    if(data[0].likes > 15){
      setMedalhaMax(true)
    }else if(data[0].likes > 10){
      setMedalhaOuro(true)
    }else if(data[0].likes > 5){
      setMedalhaPrata(true)
    }else{
      setMedalhaBronze(true)
    }
    console.log(data[0].nome)
  }

  useEffect(() => {
    buscaNome()
  }, [])

  async function handleInsert(){

      if(codDisciplina == '' || nomeDisciplina == ''){
        Alert.alert('Os campos devem estar preenchidos!');
        console.log('Os campos devem estar preenchidos!');
      }
      else{
        const { data, error } = await supabase
        .from('disciplina')
        .insert([{ coddisciplina: codDisciplina.toUpperCase(), nomedisciplina: nomeDisciplina }])
                
        if (error){
          if(error.code == 23505){
            Alert.alert('Já existe uma disciplina com esse código.')
          }
          console.error(error)
        } 
        else{
          Alert.alert('Disiplina Adicionada com sucesso!');
          console.log('Disiplina Adicionada com sucesso!');

          navigation.navigate({
            name: route.params?.fromScreen,
            merge: true,
          });
        }
      }
          
  }
  
  return(
        <SafeAreaView style = {styles.safeContainer}>
            <View style = {styles.container}>

                <View style = {styles.barraTopo}>
                  <View style = {styles.usuario}>
                    {medalhaBronze && (<Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />)}
                    {medalhaPrata && (<Image source = {require("../assets/medalhas/medalhaPrata.png")} style={styles.medalha} />)}
                    {medalhaOuro && (<Image source = {require("../assets/medalhas/medalhaOuro.png")} style={styles.medalha} />)}
                    {medalhaMax && (<Image source = {require("../assets/medalhas/medalhaMaxima.png")} style={styles.medalha} />)}
                    <TouchableOpacity onPress={()=>navigation.navigate('Perfil')}>
                      <Text style = {{minWidth: vw(20), fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 15, display: 'flex',alignItems: 'center'}}>
                                {nome.length > 10 ? nome.substring(0, 10) + '...' : nome}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style = {{display: 'flex', width: '42%', alignItems: 'center', flexDirection: 'row',height: "60%", borderRadius: 10, backgroundColor: 'white', marginLeft: '5%', marginRight:'5%'}}>
                    <TextInput style = {{width: '80%'}} />
                    <Image source = {require("../assets/icones/iconeLupa.png")}
                    style = {{width: 20, height: 20}}/>
                  </View>

                  <Menu navigation={navigation}></Menu>
                </View>
                
                
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                  <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', paddingBottom: 40, minHeight:vh(100)}} showsVerticalScrollIndicator={false}>
                    <View style={{width: '90%', marginLeft:'5%', marginTop:"5%",gap:50, display:'flex',flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity style = {{width: '10%',backgroundColor: '#D9D9D9', borderRadius: 20, paddingHorizontal: 30, paddingVertical: 5, display: 'flex', alignItems: 'center'}} onPress={() => navigation.goBack()}>
                              <Image source = {require("../assets/icones/iconeSetaEsquerda.png")}
                              style = {{width: 30, height: 30}}/>
                          </TouchableOpacity>
                    </View>
                    <View style = {{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>

                          <Text style = {{color: 'white',fontSize: 25, fontWeight: 'bold',paddingVertical:20, textAlign: 'center',}}>Adicionar Disciplina</Text>

                    </View> 

                      <View style={{width: vw(85), backgroundColor: '#336699', borderRadius: 27, paddingVertical: 30, alignItems: 'center', marginBottom:vh(5)}}>
                          <View style={{width: '100%', backgroundColor: '#D9D9D9', gap: 10, alignItems: 'center'}}>
                            <Text style = {[styles.titulo, {marginTop: vh(2)}]}>Código da Disciplina</Text>
                            <TextInput style = {styles.inputTitulo} value={codDisciplina} onChangeText={setCodDisciplina}/>
                            <Text style = {styles.titulo}>Nome da Disciplina</Text>
                            <TextInput style = {styles.inputTitulo} value={nomeDisciplina} onChangeText={setNomeDisciplina}/>
                            <TouchableOpacity style = {[styles.criarTopico, {marginTop: vh(10), marginBottom: vh(4)}]} onPress={() => {handleInsert()}}>
                              <LinearGradient style={[{height:"100%", width:'100%', alignItems: 'center', justifyContent:'space-around', flexDirection:'row', borderRadius:20}]} colors={['#0066FF','#00AACC']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                                <Text style={{color:'white'}}>Adicionar Disciplina</Text>
                              </LinearGradient>
                            </TouchableOpacity>
                          </View>
                      </View>
                  </ScrollView>
                </LinearGradient>
            </View>
            
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  
  safeContainer:{
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    
  },

   barraTopo: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '10%',
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
    flex:'1',
    overflow: 'scroll',
    display:'flex',
    alignItems: 'center'
  },

  titulo: {
    // paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,

  },

  inputTitulo:{
    // paddingVertical: 10,
    width: vw(77),
    paddingHorizontal:vw(4),
    minHeight: vh(5),
    backgroundColor: 'white',
    borderRadius: 13,
  

  },

  inputConteudo:{

    width: vw(77),
    minHeight: vh(23),
    padding: vw(4),
    backgroundColor: 'white',
    borderRadius: 13,
    textAlignVertical: 'top'

  },

  anexarImagem:{
    marginTop: vh(1),
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
    marginBottom: vh(1),
    width: vw(53),
    height: vh(5),
    backgroundColor: '#D9D9D9',

  },

});
