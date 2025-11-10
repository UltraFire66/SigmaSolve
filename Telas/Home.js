import { View, Text, ScrollView, StyleSheet,Button, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Disciplina from '../components/disciplina';
import Menu from '../components/menu';
import { useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { IdContext } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({navigation}){
  const [idUsuario,setIdUsuario] = useContext(IdContext)
  const [nome, setNome] = useState('')
  const [disciplinas, setDisciplinas] = useState([])
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

  async function buscaDisciplinas(){
    
    const { data, error } = await supabase
            .from('disciplina')
            .select('*')
    setDisciplinas(data)
    console.log(disciplinas)
  }

  useEffect(() => {
    buscaNome()
    buscaDisciplinas()
  }, [])
  

    return(
        <SafeAreaView style = {styles.safeContainer}>
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

                  <View style = {{display: 'flex', width: '42%', alignItems: 'center', flexDirection: 'row',height: "60%", borderRadius: 10, backgroundColor: 'white', marginLeft: '8%'}}>
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
                  <View style = {styles.topoTela}>

                    <Text style = {styles.titulo}>Disciplinas</Text>              

                  </View>

                  <View style={{width:"90%", height:"80%", alignItems:'center', justifyContent:'center'}}>
                    <ScrollView style={{width:"100%", height:'100%'}}>
                      <FlatList
                        data={disciplinas}
                        keyExtractor={(item) => item.idDisciplina.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                          <Disciplina disciplina={item.nomedisciplina} onPress={()=>navigation.navigate('ForumDisciplina', {item: item})}></Disciplina>
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
    flex: 1
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
    justifyContent: 'center',
    opacity: 1,
    marginBottom: '7.5%',
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
    borderRadius: 20,
    fontSize: 15,
    fontWeight: 400,
    display: 'flex',
    textAlign:'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    marginRight: '6%'
  },
  usuario:{
    display:'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
  },

  medalha:{
    width: 35,
    height: 40,
    objectFit: 'contain',
    
  }
});
