import { View, Text, ScrollView, StyleSheet,Button,Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Cadastro({navigation}){

    return(
        <View style={[styles.container, {backgroundColor: 'pink'}]}>
          
          <View style={[styles.view1, {justifyContent: 'center', backgroundColor: "blue", width:"100%"}]}>
            <LinearGradient style={[styles.view1, {width:'100%', alignItems: 'center', justifyContent:'center'}]} colors={['#00AACC', '#0066FF']}>
                <View style={{backgroundColor: '#D9D9D9', height: "90%", width:"80%", borderRadius: "40px"}}>
                  <View style={{ alignItems:'center'}}>
                    <Image source={require('../assets/lupa.png')} style={{marginTop: "10%"}} />
                    <Text style={{color:'#0066FF', fontWeight: "bold"}}>SigmaSolve</Text>
                    <Text style={{color:'#00AACC', fontWeight: "bold"}}>A comunidade de estudos do CEFET!</Text>
                  </View>
                  <View>
                    <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%"}}>Email Institucional</Text>
                    <TextInput style={{height: 30, width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%"}}/>
                    <Text style={{color:'#003366', marginLeft:"7%", marginTop:"5%"}}>Email Institucional</Text>
                    <TextInput style={{height: 30, width:"90%",backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginLeft:"5%"}}/>
                    <Text> Boa sorte davi ;) </Text>
                    <Button title="ir para Cadastro" onPress={() => {navigation.navigate('Cadastro')}}/>
                  </View>
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