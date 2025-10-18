import { View, Text, ScrollView, StyleSheet,Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home({navigation}){

    return(
        <>
            <View style = {styles.container}>
                <View style = {styles.barraTopo}>

                </View>
                <LinearGradient 
                colors = {['#00AACC','#0066FF']}
                style = {styles.tela}
                >
                    
                </LinearGradient>
            </View>
            
        </>
    )

}

const styles = StyleSheet.create({
  container: {
    
    width: '100%',
    height: '100%',
  },

  barraTopo: {
    backgroundColor: 'white',
    width: '100%',
    height: '10%',
    boxShadow: '0px 0px 5px 0px black',
  },
  tela: {
    width: '100%',
    height: '100%',
  }
});
