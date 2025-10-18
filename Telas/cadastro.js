import { View, Text, ScrollView, StyleSheet,Button,Image, TextInput,TouchableOpacity, Touchable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Cadastro({navigation}){

    return(
        <View style={[styles.container, {backgroundColor: 'pink'}]}>
          
          <View style={[styles.view1, {justifyContent: 'center', backgroundColor: "blue", width:"100%"}]}>
            <LinearGradient style={[styles.view1, {width:'100%', alignItems: 'center', justifyContent:'center'}]} colors={['#00AACC', '#0066FF']}>
              <View style={{alignItems:'center', marginBottom:"5%"}}>
                    <Text style={{color:'white', fontSize: 20}}>SigmaSolve</Text>
                    <Text style={{color:'white'}}>Crie sua conta e comece a estudar!</Text>
              </View>
              <View style={{backgroundColor: '#D9D9D9', height: "80%", width:"80%", borderRadius: 40}}>
                
                <View style={{ alignItems:'center'}}>
                  
                  <Text style={{color:'#0066FF', fontWeight: "bold", fontSize: 15, marginTop:"3%"}}>Criar Conta</Text>
                  <Text style={{color:'#00AACC', fontWeight: "bold"}}>Preencha seus dados para se cadastrar</Text>
                </View>
                <View style={{marginTop:"10%"}}>
                  <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Nome Completo</Text>
                  <TextInput style={{height: 30, width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%"}}/>
                  <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Email Institucional</Text>
                  <TextInput style={{height: 30, width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%"}}/>
                  <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Senha</Text>
                  <TextInput style={{height: 30, width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%"}}/>
                  <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%", fontWeight: "500"}}>Confimar Senha</Text>
                  <TextInput style={{height: 30, width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%"}}/>
                </View>
                <TouchableOpacity style={{marginBottom:0, marginTop:"15%", marginLeft:"10%", height:"11%", width:'80%', alignItems: 'center', justifyContent:'center', borderRadius:10}} onPress={() => navigation.navigate('Login') }>
                      <LinearGradient style={[{height:"100%", width:'100%', alignItems: 'center', justifyContent:'space-around', flexDirection:'row', borderRadius:10}]} colors={['#0066FF','#00AACC']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                          <Text style={{color:'white'}}>Criar Conta</Text>
                      </LinearGradient>
                </TouchableOpacity>                
                <Text style={{color:'#00AACC', marginLeft:"10%", marginTop:"15%"}}>Já tem uma conta?</Text>
                <TouchableOpacity style={{marginTop:"5%", marginLeft:"10%", height:"11%",width:'80%', borderColor:"#0066FF", borderWidth:1, alignItems: 'center', justifyContent:'center', borderRadius:10}} onPress={() => navigation.navigate('Login')}> 
                      <Text style={{color:'#0066FF'}}>Fazer login</Text>
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