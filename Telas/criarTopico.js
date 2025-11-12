import { View, Text, ScrollView, StyleSheet,Button,Image, TextInput,TouchableOpacity, Touchable, Alert} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { Buffer } from 'buffer';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { vh, vw } from 'react-native-css-vh-vw';
import { React, useState, useContext,useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js'
import {IdContext} from '../App'
import { useRoute } from '@react-navigation/native';
import Menu from '../components/menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function CriarTopico({navigation}){
  
  const agora = new Date().toLocaleString('af-ZA',{timeZone: 'America/Sao_Paulo'});
  //console.log(agora.slice(0,20).replaceAll('/','-').replace(',',''));
  const route = useRoute();
  const {item} = route.params;
  console.log(item)
  const[titulo,setTitulo] = useState('');
  const[conteudo,setConteudo]= useState('');
  const[horario,setHorario] = useState(agora.slice(0,20).replaceAll('/','-').replace(',',''));
  //const[data,setData] = useState(agora.toISOString().slice(0, 19).replace('T', ' '));
  //console.log(data);
  const[imagem,setImagem] = useState('');
  const[idUsuario,setIdUsuario] = useContext(IdContext);
  const[codDisciplina,setCodDisciplina] = useState(item.coddisciplina);
  const[nome,setNome] = useState('');

  const [uploading, setUploading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [asset, setAsset] = useState('');

  const supabaseUrl = 'https://uqwqhxadgzwrcarwuxmn.supabase.co/'
  const supabaseKey = "sb_publishable_3wQ1GnLmKSFxOiAEzjVnsg_1EkoRyxV"
  const supabase = createClient(supabaseUrl, supabaseKey)



  const pickImage = async () => {
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
  };

  
  const uploadImageToSupabase = async (asset) => {
    try {
      setUploading(true);

      const { uri, fileName, mimeType } = asset;
      const fileExt = fileName?.split('.').pop() ?? 'jpg';
      const newFileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${newFileName}`;

      // Lê o arquivo local como base64
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

      // Converte para bytes
      const bytes = Buffer.from(base64, 'base64');

      // Faz upload para o bucket do Supabase
      const { data, error } = await supabase.storage
        .from('imagens')
        .upload(filePath, bytes, {
          contentType: mimeType || `image/${fileExt}`,
          upsert: false,
        });

      if (error) throw error;

      const publicUrl = `${supabaseUrl}/storage/v1/object/public/imagens/${filePath}`;
      setUploadedUrl(publicUrl);

      console.log('Upload concluído:', publicUrl);
      return publicUrl;
    } catch (err) {
      console.error('Erro no upload:', err);
      alert('Erro ao enviar imagem.');
      return null;
    } finally {
      setUploading(false);
    }
  };
  
  async function buscaNome(){
    const { data, error } = await supabase
            .from('usuario')
            .select('*')
            .eq('idusuario', idUsuario)
    setNome(data[0].nome)
    //console.log(data[0].nome)
  }
  useEffect(() => {
    buscaNome()
  }, [])
    
  
  async function handleInsert(){
      let publicUrl = '';
      if (asset) {
        publicUrl = await uploadImageToSupabase(asset);
      }
      if(conteudo == '' || titulo == ''){
        Alert.alert('Os campos devem estar preenchidos!');
        console.log('Os campos devem estar preenchidos!');
      }
      else{
        const { data, error } = await supabase
        .from('topico')
        .insert([{ conteudotexto: conteudo, conteudoimg: publicUrl || null, titulotopico: titulo, fk_usuario_idusuario: idUsuario, fk_disciplina_coddisciplina: codDisciplina }])
                
        if (error) console.error(error)
        else{
          Alert.alert('Topico Criado com sucesso!');
          console.log('Topico Criado com sucesso!');
          navigation.goBack();
        }
      }
          
  }
  
  return(
        <SafeAreaView style = {styles.safeContainer}>
            <View style = {styles.container}>

                <View style = {styles.barraTopo}>
                  <View style = {styles.usuario}>

                    <Image source = {require("../assets/medalhas/medalhaBronze.png")} style={styles.medalha} />
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

                          <Text style = {{color: 'white',fontSize: 25, fontWeight: 'bold',paddingVertical:20, textAlign: 'center',}}>{item.nomedisciplina}</Text>

                    </View> 

                      <View style={{width: vw(85), backgroundColor: '#336699', borderRadius: 27, paddingVertical: 30, alignItems: 'center', marginBottom:vh(5)}}>
                          <View style={{width: '100%', backgroundColor: '#D9D9D9', gap: 10, alignItems: 'center'}}>
                            <Text style = {styles.titulo}>Título do Tópico</Text>
                            <TextInput style = {styles.inputTitulo} value={titulo} onChangeText={setTitulo}/>
                            <Text style = {styles.titulo}>Conteúdo da postagem</Text>
                            <TextInput  multiline={true} style = {styles.inputConteudo} value={conteudo} onChangeText={setConteudo}/>
                            {imageUri && (<Image source={{uri: imageUri}} resizeMode='contain' style={{width:vw(50), height:vh(50)}}/>)}
                            <TouchableOpacity style = {styles.anexarImagem} onPress={pickImage}>
                              <Text  style = {{color: '#0066FF'}}>Anexar Imagens</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.criarTopico} onPress={() => {handleInsert()}}>
                              <LinearGradient style={[{height:"100%", width:'100%', alignItems: 'center', justifyContent:'space-around', flexDirection:'row', borderRadius:20}]} colors={['#0066FF','#00AACC']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                                <Text style={{color:'white'}}>Criar Tópico</Text>
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
