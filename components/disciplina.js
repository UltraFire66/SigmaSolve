import {Text,View, StyleSheet, Image, Touchable, TouchableOpacity,Modal} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { vh, vw } from 'react-native-css-vh-vw';
import { supabase } from '../context/supabase';
import { useState } from 'react';

function Disciplina(props){

  const [modalExcluirVisible,setModalExcluirVisible] =  useState(false);
  const [visivel,setVisivel] =  useState(props.visivel);

  async function deletar(){

    const { data, error} = await supabase
          .from('disciplina')
          .update({visivel: false})
          .eq('coddisciplina', props.coddisciplina);
          console.log('disciplina arquivada com sucesso');
          setVisivel(false);
          setModalExcluirVisible(false);
  }

    return(
        <>
        {visivel  && (

          <View style={{}}>
          <TouchableOpacity
            style={{ marginTop: '0%', marginBottom: '5%' }}
            onPress={props.onPress}
          >

            <View style={{backgroundColor: '#336699',borderRadius: 15,width: '100%',padding: 10,paddingBottom: 20}}>

              {props.excluivel && (

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                < TouchableOpacity onPress={() =>{setModalExcluirVisible(true)}}>
                  <Feather name="trash-2" size={22} color="white" />
                </TouchableOpacity>
                </View>

              )}
              

           
              <View
                style={{justifyContent: 'center',alignItems: 'center',marginTop: 10,marginBottom: 10}}>

                <Text style={{color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center'}}>
                  {props.disciplina}
                </Text>
              </View>

            </View>
            
          </TouchableOpacity>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalExcluirVisible}
            >
              <TouchableOpacity style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', width:vw(100), height: vh(100)}} onPressOut={() => setModalExcluirVisible(false)}>                  
              </TouchableOpacity>
              

                <View style={{backgroundColor:'white', borderWidth:3, borderColor:'#D9D9D9', position: 'absolute', width: vw(90), height: vh(20), right: vw(5), top: vh(40), borderRadius:35, display: 'flex', alignItems:'center', justifyContent:'center', gap:vh(5)}}>
              
                  <Text style={{fontWeight:600, fontSize:18, textAlign:'center'}}>Tem certeza que deseja excluir esta disciplina?</Text>
                  <View style={{display:'flex', flexDirection:'row', gap:vw(15)}}>
                    
                    <TouchableOpacity style={{backgroundColor:'#78ABC6', paddingVertical:vh(1.5), paddingHorizontal:vw(5), borderRadius:15}} onPressOut={()=>{deletar()}}>
                      <Text style={{fontWeight:600, fontSize:18, color:'white'}}>
                        Sim
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#E04083', paddingVertical:vh(1.5), paddingHorizontal:vw(5), borderRadius:15}} onPressOut={()=>{setModalExcluirVisible(false)}}>
                      <Text style={{fontWeight:600, fontSize:18, color:'white'}}>
                        Não
                      </Text>
                    </TouchableOpacity>
                  </View>
              
                </View>
          
                            
          </Modal>
          
        </View>  
        
        )}
        </>
    )
}


export default Disciplina;


const styles = StyleSheet.create({
  
  criarTopico: {
    marginTop: '10%',
    width:'80%',
    height: '16%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: "column",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: 'center',
  },
  topo:{

    width: '100%',
    display: 'flex',
    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',

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
    height: '6%',
    width: '80%',
    backgroundColor: '#336699',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3%',
    
  }
});