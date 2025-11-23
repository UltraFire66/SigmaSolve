import {Text,Modal,View, StyleSheet, Image, Touchable, TouchableOpacity} from 'react-native';
import {useContext, useState} from 'react';
import { vh, vw } from 'react-native-css-vh-vw';
import { userID } from '../context/idUsuario';

function Menu(props){
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [idUsuario,setIdUsuario] = useContext(userID);

    return(
        <>
            <TouchableOpacity onPressOut={() => setModalVisible(true)}>
                <Image source = {require("../assets/icones/menuLateral.png")}
                    style = {{ width: 40,height:40, marginLeft: '7%'}}/>
            </TouchableOpacity>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableOpacity style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', width:vw(100), height: vh(100)}} onPressOut={() => setModalVisible(false)}>                  
                </TouchableOpacity>
                <View style={{backgroundColor:'white', borderWidth:3, borderColor:'#D9D9D9', position: 'absolute', width: vw(40), height: vh(30), right:0, top: vh(10), borderRadius:5, display: 'flex', alignItems:'flex-start', paddingLeft:vw(5), justifyContent:'center', gap:'15%'}}>
                    <TouchableOpacity onPress={()=>{setModalVisible(false); props.navigation.navigate('Home')}}>
                        <Text style={{fontWeight:600, fontSize:18}}>
                            Início
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setModalVisible(false); props.navigation.navigate('Perfil')}}>
                        <Text style={{fontWeight:600, fontSize:18}}>
                            Perfil
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setModalVisible(false); props.navigation.navigate('ConfigurarPerfil')}}>
                        <Text style={{fontWeight:600, fontSize:18}}>
                            Configuração
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        setModalVisible(false);
                        setIdUsuario(0);
                        props.navigation.navigate('Login')}}>
                        <Text style={{fontWeight:600, fontSize:18}}>
                            Sair
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    )
}

export default Menu;