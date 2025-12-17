import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Disciplina from '../components/disciplina';
import Menu from '../components/menu';
import { useContext, useState, useEffect, use } from 'react'
import { supabase } from '../context/supabase';
import { userID } from '../context/idUsuario';
import { vh, vw } from 'react-native-css-vh-vw';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({navigation}){
  const [idUsuario,setIdUsuario] = useContext(userID)
  const [nome, setNome] = useState('')
  const [filtro,setFiltro] =  useState('')
  const [disciplinas, setDisciplinas] = useState([])
  const [disciplinasFiltradas,setDisciplinasFiltradas] = useState([]);
  const [medalhaBronze, setMedalhaBronze] = useState(false)
  const [medalhaPrata, setMedalhaPrata] = useState(false)
  const [medalhaOuro, setMedalhaOuro] = useState(false)
  const [medalhaMax, setMedalhaMax] = useState(false)
  const [ehAdmin, setEhAdmin] = useState(false)

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

    
    if(data[0].email == 'admin'){
      setEhAdmin(true)
    }else{
      console.log('não é o admin')
    }

    console.log(data[0].nome)
  }

  async function buscaDisciplinas(){
    
    const { data, error } = await supabase
            .from('disciplina')
            .select('*')
    setDisciplinas(data)
    setDisciplinasFiltradas(data)
    console.log(disciplinas)
  }

  function fazerPesquisa(){


    if(filtro.trim() === ''){
      setDisciplinasFiltradas(disciplinas);
    }
    
  
      const textoFormatado = filtro.toLowerCase();
      

      const filtrado = disciplinas.filter(item => {

        return item.nomedisciplina.toString().toLowerCase().includes(textoFormatado)

      })

      setDisciplinasFiltradas(filtrado);

    

  }

  useEffect(() => {
    buscaNome()
    buscaDisciplinas()
  }, [])
  

  
  useEffect(() => {
  fazerPesquisa()
}, [filtro])

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

                  <View style = {{display: 'flex', width: '42%', alignItems: 'center', flexDirection: 'row',height: "45%", borderRadius: 10, backgroundColor: 'white', marginLeft: '5%', marginRight:'5%'}}>
                    <TextInput style = {{color: 'black', width: '80%',height:'50%',marginLeft: '5%'}} value={filtro} onChangeText={setFiltro}/>

                    <TouchableOpacity onPress={()=>{fazerPesquisa()}}>

                      <Image source = {require("../assets/icones/iconeLupa.png")} style = {{width: 20, height: 20}}/>

                      </TouchableOpacity>
                  </View>

                  <Menu navigation={navigation}></Menu>
                </View>

                
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                  <View style = {styles.topoTela}>

                    {ehAdmin ? 
                    (<>
                      <Text style = {styles.titulo}>Disciplina</Text>
                      <TouchableOpacity style = {styles.criarTopico} onPress={()=>navigation.navigate('AdicionarDisciplina', {fromScreen: 'Home'})}>
                        <Text style = {{fontWeight: 'bold', textAlign: 'center'}}>Adicionar Disciplinas</Text>
                      </TouchableOpacity>
                    </>) : (<Text style = {styles.titulo}>Disciplinas</Text>)}              

                  </View>

                  <View style={{width:"90%", height:"80%", alignItems:'center', justifyContent:'center'}}>
                    <ScrollView style={[{width:"100%", height:"100%"}, ehAdmin ? {marginBottom: vh(10)} : '']}>
                      <FlatList
                        data={disciplinasFiltradas}
                        keyExtractor={(item) => item.idDisciplina.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                          
                          <Disciplina disciplina={item.nomedisciplina} coddisciplina= {item.coddisciplina} visivel = {item.visivel} excluivel={ehAdmin} navigation={navigation} onPress={()=>navigation.navigate('ForumDisciplina', {item: item})}></Disciplina>
                        )}
                      />
                    </ScrollView> 
                  </View> 

                </LinearGradient>
          </View>
            
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  
  safeContainer:{
    flex: 1,
    backgroundColor:'#D9D9D9'
  },
  
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  barraTopo: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '10%',
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
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
    opacity: 1,
    marginBottom: '10%',
    marginTop:'5%'
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  criarTopico: {
    backgroundColor: 'white',
    width: vw(25),
    height: vh(6),
    borderRadius: 20,
    fontSize: 15,
    fontWeight: 'bold',
    display: 'flex',
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',   
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
    
  }
});

