import { View, Text, ScrollView, StyleSheet,Button,Image, TextInput,TouchableOpacity, Touchable, Alert, Modal, Linking, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { Buffer } from 'buffer';
import { LinearGradient } from 'expo-linear-gradient';
//import Post from '../components/post';
import { vh, vw } from 'react-native-css-vh-vw';
import { React, useState, useContext,useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { supabase } from '../context/supabase';
import { userID } from '../context/idUsuario';
import { useRoute } from '@react-navigation/native';
import Menu from '../components/menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as IntentLauncher from 'expo-intent-launcher';
import * as DocumentPicker from "expo-document-picker";

export default function CriarComentario({navigation}){
  
  const agora = new Date().toLocaleString('af-ZA',{timeZone: 'America/Sao_Paulo'});
  //console.log(agora.slice(0,20).replaceAll('/','-').replace(',',''));
  const route = useRoute();
  const {props} = route.params;
  const {disciplina} = route.params;
  const {fromScreen} = route.params;
  const {pesquisaNavegacao} = route.params;
  console.log('pesquisaNavegacao')
  console.log(pesquisaNavegacao)
  console.log(props)
  const[titulo,setTitulo] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const[conteudo,setConteudo]= useState('');
  const[horario,setHorario] = useState(agora.slice(0,20).replaceAll('/','-').replace(',',''));
  //const[data,setData] = useState(agora.toISOString().slice(0, 19).replace('T', ' '));
  //console.log(data);
  const[imagem,setImagem] = useState('');
  const[idUsuario,setIdUsuario] = useContext(userID);
  const[idTopico,setIdTopico] = useState(props.idtopico);
  const[nome,setNome] = useState('');
  const [medalhaBronze, setMedalhaBronze] = useState(false)
  const [medalhaPrata, setMedalhaPrata] = useState(false)
  const [medalhaOuro, setMedalhaOuro] = useState(false)
  const [medalhaMax, setMedalhaMax] = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [uploadedUrlImg, setUploadedUrlImg] = useState('');
  const [asset, setAsset] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadedUrlPdf, setUploadedUrlPdf] = useState(null);
  const [ehPDF, setEhPDF] = useState(null);

  async function openLocalPdf(uri) {
    if (Platform.OS === 'android') {
      const contentUri = await FileSystem.getContentUriAsync(uri);
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: contentUri,
        flags: 1,
        type: 'application/pdf',
      });
    } else {
      Linking.openURL(uri); // iOS abre diretamente
    }
  }

  async function pickPDF() {
    setEhPDF(true)
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (result.canceled) return;

    const file = result.assets[0];

    setSelectedPdf(file);
    setUploadedUrlPdf(null);
    setModalVisible(false)
  }

  async function uriToBlob(uri) {
    try {
      const base64File = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const byteCharacters = atob(base64File);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        byteArrays.push(new Uint8Array(byteNumbers));
      }

      return new Blob(byteArrays, { type: "application/pdf" });
    } catch (err) {
      console.log("Erro ao converter URI para blob:", err);
      return null;
    }
  }

  async function uploadPDF() {
    if (!selectedPdf) return null;

    setUploadingPdf(true);

    try {
      const filePath = `pdfs/${Date.now()}-${selectedPdf.name}`;

      const base64 = await FileSystem.readAsStringAsync(selectedPdf.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

      const { data, error } = await supabase.storage
        .from("imagens")
        .upload(filePath, bytes, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (error) {
        console.log("Erro no upload:", error);
        Alert.alert("Erro no upload", error.message);
        setUploadingPdf(false);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from("imagens")
        .getPublicUrl(filePath);

      setUploadedUrlPdf(urlData.publicUrl);
      setUploadingPdf(false);

      return urlData.publicUrl;

    } catch (err) {
      console.log("Erro ao enviar PDF:", err);
      setUploadingPdf(false);
      return null;
    }
  }


  const pickImage = async () => {
    setEhPDF(false)
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permita o acesso à galeria para escolher uma imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setAsset(result.assets[0]);
    }
    setModalVisible(false)
  };

  
  const uploadImageToSupabase = async (asset) => {
    try {
      setUploadingImg(true);
      const { uri, fileName, mimeType } = asset;
      const fileExt = fileName?.split('.').pop() ?? 'jpg';
      const newFileName = `${Date.now()}.${fileExt}`;
      const filePath = `imagens/${newFileName}`;
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
      const bytes = Buffer.from(base64, 'base64');

      const { data, error } = await supabase.storage
        .from('imagens')
        .upload(filePath, bytes, {
          contentType: mimeType || `image/${fileExt}`,
          upsert: false,
        });

      if (error) throw error;

      const publicUrlImg = `https://uqwqhxadgzwrcarwuxmn.supabase.co/storage/v1/object/imagens/${filePath}`;
      setUploadedUrlImg(publicUrlImg);

      console.log('Upload concluído:', publicUrlImg);
      return publicUrlImg;
    } catch (err) {
      console.error('Erro no upload:', err);
      alert('Erro ao enviar imagem.');
      return null;
    } finally {
      setUploadingImg(false);
    }
  };
  
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
     
   console.log(route.params)

   async function handleInsert(){
    let publicUrlImg = null;
    let publicUrlPdf = null;
    let nomePdf = null;
    if(ehPDF){
      if(selectedPdf){
      publicUrlPdf = await uploadPDF()
      nomePdf = selectedPdf.name
      console.log(publicUrlPdf)
    }
    }else{
      if (asset) {
        publicUrlImg = await uploadImageToSupabase(asset);
      }
    }

    if(conteudo == ''){
      Alert.alert('Os campos devem estar preenchidos!');
      console.log('Os campos devem estar preenchidos!');
    } else{
      const { data, error } = await supabase
      .from('comentario')
      .insert([{ conteudotexto: conteudo, nomePdf: nomePdf || null, urlPDF: publicUrlPdf || null, conteudoimg: publicUrlImg || null,  fk_topico_idtopico: idTopico, fk_usuario_idusuario: idUsuario, fk_comentario_idcomentario:null}])   
        if (error) console.error(error)
        else{
        Alert.alert('Comentario Criado com sucesso!');
        console.log('Comentario Criado com sucesso!');
        navigation.navigate(fromScreen,{item:pesquisaNavegacao});
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

                          <Text style = {{color: 'white',fontSize: 25, fontWeight: 'bold',paddingVertical:20, textAlign: 'center',}}>{disciplina}</Text>

                    </View> 

                      <View style={{width: vw(85), backgroundColor: '#336699', borderRadius: 27, paddingVertical: 30, alignItems: 'center', marginBottom:vh(5)}}>
                          <View style={{width: '100%', backgroundColor: '#D9D9D9', gap: 10, alignItems: 'center'}}>
                            <Text style = {styles.titulo}>Conteúdo do comentário</Text>
                            <TextInput  multiline={true} style = {styles.inputConteudo} value={conteudo} onChangeText={setConteudo}/>
                            {ehPDF ? (selectedPdf && (
                              <View style={{ marginBottom: vh(1), alignItems: 'center', justifyContent:'center' }}>
                                <Text style={{ fontSize: 16, marginTop: vh(1), marginBottom: vh(1) }}>
                                  PDF selecionado:
                                </Text>
                                <Feather name = 'file-text' size={100} color="black" />
                                <Text style={{ fontWeight: "bold", marginBottom: 10, textAlign: 'center' }}>
                                  {selectedPdf.name}
                                </Text>
                                <TouchableOpacity style = {[styles.anexarImagem, {width: vw(30)}]} onPress={() => openLocalPdf(selectedPdf.uri)}>
                                  <Text style = {{color: '#0066FF'}} >Abrir prévia</Text>
                                </TouchableOpacity>
                              </View>
                            )) : (imageUri && (<Image source={{uri: imageUri}} resizeMode='contain' style={{width:vw(50), height:vh(50)}}/>))}
                            
                            
                            <TouchableOpacity style = {styles.anexarImagem} onPress={() => setModalVisible(true)}>
                              <Text  style = {{color: '#0066FF'}}>Anexar Imagem ou Arquivo PDF</Text>
                            </TouchableOpacity>
                          
                            <Modal animationType="none" transparent={true} visible={modalVisible} >
                                <TouchableOpacity style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', width:vw(100), height: vh(100)}} onPressOut={() => setModalVisible(false)}>                  
                                </TouchableOpacity>
                                <View style={{backgroundColor:'white', borderWidth:3, borderColor:'#D9D9D9', position: 'absolute', width: vw(90), height: vh(30), right: vw(5), top: vh(40), borderRadius:35, display: 'flex', alignItems:'center', justifyContent:'center' }}>
                                  <Text style={{fontWeight:600, fontSize:18, textAlign:'center', marginBottom: vh(6)}}>Você deseja anexar uma imagem ou um arquivo PDF?</Text>
                                  <View style={{display:'flex', flexDirection:'row', gap:vw(15), marginBottom: vh(3)}}>
                                    <TouchableOpacity onPress={pickImage} style={{backgroundColor:'#78ABC6', borderRadius:15, width: vw(25), height: vh(10), alignItems:'center', justifyContent: 'center'}}>
                                      <Text style={{fontWeight:600, fontSize:18, color:'white'}}>
                                        Imagem
                                      </Text>
                                      <Feather name = 'image' size={50} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={pickPDF} style={{backgroundColor:'#78ABC6', borderRadius:15, width: vw(25), height: vh(10), alignItems:'center', justifyContent: 'center'}}>
                                      <Text style={{fontWeight:600, fontSize:18, color:'white'}}>
                                        PDF
                                      </Text>
                                      <Feather name = 'file-text' size={50} color="white" />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                            </Modal>
                            <TouchableOpacity style = {styles.criarTopico} onPress={() => {handleInsert()}}>
                              <LinearGradient style={[{height:"100%", width:'100%', alignItems: 'center', justifyContent:'space-around', flexDirection:'row', borderRadius:20}]} colors={['#0066FF','#00AACC']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                                <Text style={{color:'white'}}>Fazer comentario</Text>
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
