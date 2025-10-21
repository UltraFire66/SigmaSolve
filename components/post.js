import {Text,View, StyleSheet, Image} from 'react-native';


function Post(props){
    return(
        <>
          <View></View>
            <View style = {styles.criarTopico}>
              <View style = {styles.topo}>
                
                <View style = {styles.usuario}>
                  <Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />
                  <Text style = {{fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: 10, display: 'flex',alignItems: 'center', marginBottom: '5px'}}>Caio Rangel</Text>
                </View>

                <Text style = {{fontSize: 13,color: 'black', opacity: 0.5}}>Há duas horas</Text>

                <Image source = {require("../assets/icones/iconeDenuncia.png")}
                style = {{width:'20px',height: '20px',marginRight: '3px'}} />


              </View>

              <Text style = {{fontSize: 10,fontWeight: 'bold',width: '75%',marginTop: '3%'}}
              >Alguém poderia me enviar conteúdo sobre eletromagnetismo?? Estou desesperado 😭😭😭😭</Text>

            </View>
            <View style = {styles.respostas}>

              <Image source = {require("../assets/icones/iconeComentario.png")}
              style = {{width:'22px',height: '22px',marginTop: '3px',marginLeft: '3%'}}/>
              <Text style = {{color: 'white',fontSize: 13}}>52</Text>

            </View>

        </>
    )
}

export default Post;

const styles = StyleSheet.create({
  
  criarTopico: {
    marginTop: '10%',
    width:'80%',
    height: '16%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: "column",
    borderTopRightRadius: "15px",
    borderTopLeftRadius: '15px',
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
    width: '25px',
    height: '30px',
    objectFit: 'contain',
    
  },

  respostas: {
    height: '6%',
    width: '80%',
    backgroundColor: '#336699',
    borderBottomRightRadius: '15px',
    borderBottomLeftRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3%',
    
  }
});
