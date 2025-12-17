import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Post from '../components/post';
import { useContext, useState, useEffect } from 'react';
import { supabase } from '../context/supabase';
import { userID } from '../context/idUsuario';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vh, vw } from 'react-native-css-vh-vw';

export default function Perfil({ navigation }) {
  const [idUsuario] = useContext(userID);
  const [nome, setNome] = useState('');
  const [likes, setLikes] = useState(0);
  const [falta, setFalta] = useState(0);

  const [medalhaBronze, setMedalhaBronze] = useState(false);
  const [medalhaPrata, setMedalhaPrata] = useState(false);
  const [medalhaOuro, setMedalhaOuro] = useState(false);
  const [medalhaMax, setMedalhaMax] = useState(false);

  const [posts, setPosts] = useState([]);
  const [temPost, setTemPost] = useState(true);
  const [nomeDis, setNomeDis] = useState('');
  const [pesquisaNavegacao, setPesquisaNavegacao] = useState('');
  const [duvida, setDuvida] = useState(true);

  async function buscaPosts() {
    const { data } = await supabase
      .from('topico')
      .select(`
        idtopico,
        conteudotexto,
        conteudoimg,
        titulotopico,
        datacriacao,
        urlPDF,
        nomePdf,
        usuario (nome, likes),
        fk_disciplina_coddisciplina,
        disciplina (nomedisciplina, coddisciplina, idDisciplina, visivel)
      `)
      .eq('flagdenunciado', false)
      .eq('fk_usuario_idusuario', idUsuario);

    if (data && data.length > 0) {
      setPosts(data);
      setNomeDis(data[0].disciplina.nomedisciplina);
      setPesquisaNavegacao(data[0].disciplina);
    } else {
      setTemPost(false);
    }
  }

  async function buscaNome() {
    const { data } = await supabase
      .from('usuario')
      .select('*')
      .eq('idusuario', idUsuario);

    const usuario = data[0];
    setNome(usuario.nome);
    setLikes(usuario.likes);

    if (usuario.likes > 15) setMedalhaMax(true);
    else if (usuario.likes > 10) {
      setMedalhaOuro(true);
      setFalta(15 - usuario.likes);
    } else if (usuario.likes > 5) {
      setMedalhaPrata(true);
      setFalta(10 - usuario.likes);
    } else {
      setMedalhaBronze(true);
      setFalta(5 - usuario.likes);
    }
  }

  useEffect(() => {
    buscaNome();
    buscaPosts();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#00AACC', '#0066FF']} style={styles.tela}>
        <FlatList
          data={temPost && duvida ? posts : []}
          keyExtractor={(item) => item.idtopico.toString()}
          renderItem={({ item }) => (
            <Post
              fromScreen="Perfil"
              disciplina={nomeDis}
              post={item}
              pesquisaNavegacao={pesquisaNavegacao}
              navigation={navigation}
            />
          )}
          ListHeaderComponent={() => (
            <>
              <View style = {{marginTop: vh(5), width: '5%',backgroundColor: '#D9D9D9', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5, display: 'flex', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../assets/icones/iconeSetaEsquerda.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center', alignItems:'center'}}>
                {medalhaBronze && <Image source={require('../assets/medalhas/medalhaBronze.png')} style={styles.medalha} />}
                {medalhaPrata && <Image source={require('../assets/medalhas/medalhaPrata.png')} style={styles.medalha} />}
                {medalhaOuro && <Image source={require('../assets/medalhas/medalhaOuro.png')} style={styles.medalha} />}
                {medalhaMax && <Image source={require('../assets/medalhas/medalhaMaxima.png')} style={styles.medalha} />}
              </View>
              <View style={styles.cabecalho}>
                <Text style={styles.nome}>{nome}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ConfigurarPerfil')}>
                  <Image
                    source={require('../assets/icones/iconeEngrenagem.png')}
                    style={{ width: 45, height: 45 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.pontuacao}>
                <Text style={styles.texto}>Pontuação total do perfil: {likes}</Text>
                <Text style={styles.texto}>
                  {medalhaMax
                    ? 'Parabéns, você alcançou a medalha máxima!'
                    : `Pontuação necessária para a próxima medalha: ${falta}`}
                </Text>
              </View>
              <Text style={styles.titulo}>Tópicos</Text>
              {!temPost && (
                <View style={styles.semPost}>
                  <Image
                    source={require('../assets/rato-sem-post.png')}
                    resizeMode="contain"
                    style={{ width: vw(50), height: vh(30) }}
                  />
                  <Text style={styles.titulo}>Você ainda não fez publicações</Text>
                </View>
              )}
            </>
          )}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: vh(15) }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  tela: {
    flex: 1,
    alignItems: 'center',
  },
  voltar: {
    width: '90%',
    marginVertical: vh(5),
  },
  medalha: {
    width: vw(40),
    height: vh(20),
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cabecalho: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pontuacao: {
    alignItems: 'center',
    marginVertical: vh(3),
  },
  texto: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    marginVertical: vh(3),
  },
  semPost: {
    alignItems: 'center',
    marginTop: vh(5),
  },
});
