import {Text,View, StyleSheet, Image, Touchable, TouchableOpacity} from 'react-native';


function Disciplina(props){
    return(
        <>
            <View style={{}}>
                <TouchableOpacity style={{marginTop:'0%', marginBottom:"5%"}} onPress = {props.onPress}>
                    <View style={{backgroundColor:'#336699', borderRadius:15, width:"100%", alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color:'white', fontSize:16, fontWeight: 'bold', marginTop:"10%", marginBottom:"10%", textAlign: 'center'}}>{props.disciplina}</Text>
                    </View>
                </TouchableOpacity>
            </View>  
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