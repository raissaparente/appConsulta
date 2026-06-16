import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function TelaAlterarSenha() {
  const roteador = useRouter();

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  function atualizarSenha() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert('Aviso', 'Preencha todos os campos!');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'A nova senha e a confirmação não batem.');
      return;
    }

    // aqui iria a lógica de chamar o firebase auth pra trocar a senha
    Alert.alert('Sucesso', 'Senha atualizada (fake)!');
    roteador.back();
  }
  /* TELA APENAS VISUAL, AINDA EM FASE DE AJUSTES. */
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Senha</Text>
      <Text style={styles.subtitulo}>Sua nova senha deve ter pelo menos 8 caracteres</Text>

      <Text style={styles.label}>Senha Atual</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a senha atual"
        secureTextEntry
        value={senhaAtual}
        onChangeText={setSenhaAtual}
      />

      <Text style={styles.label}>Nova Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a nova senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      <Text style={styles.label}>Confirmar Nova Senha</Text>
      <TextInput
        style={[styles.input, { marginBottom: 32 }]}
        placeholder="Confirme a nova senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity
       onPress={atualizarSenha} 
       style={styles.Botao}
      >
        <Text style={styles.textoBotao}>Atualizar Senha</Text>
       
      </TouchableOpacity>
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16
  },
  titulo: {
    fontSize: 24, 
    marginBottom: 24,
    fontWeight: 'bold',
    marginTop: 8
  },
  subtitulo:{
    marginTop: -20,
    fontSize: 14,
    marginBottom: 24,
    fontWeight: '400'
  },
  label: {
    marginBottom: 4, 
    fontSize: 14,
    fontWeight: '600'
  },
  input: {
    padding: 12, 
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderColor: '#C9C9C9',
    paddingRight: 10
  },
  Botao:{
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 14,
    padding: 18,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#478BF0',
    borderColor: '#478BF0'
  },
  textoBotao:{
    color: '#FFF',
    textAlign: 'center',
    marginRight: 10

  },

});
