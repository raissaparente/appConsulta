import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaAlterarSenha() {
  const roteador = useRouter();

  function salvarNovaSenha() {
    Alert.alert('Sucesso', 'Sua senha foi atualizada!');
    roteador.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Senha</Text>

      <Text style={styles.label}>Senha Atual</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a senha atual"
        secureTextEntry
      />

      <Text style={styles.label}>Nova Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a nova senha"
        secureTextEntry
      />

      <Text style={styles.label}>Confirmar Nova Senha</Text>
      <TextInput
        style={[styles.input, { marginBottom: 32 }]}
        placeholder="Confirme a nova senha"
        secureTextEntry
      />

      <Pressable
        style={styles.botao}
        onPress={salvarNovaSenha}
      >
        <Text style={styles.textoBotao}>Atualizar Senha</Text>
      </Pressable>
    </View>
  );
}

// Estilos globais dessa tela pro seu colega alterar depois
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16
  },
  titulo: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 24
  },
  label: {
    marginBottom: 4, 
    fontWeight: '500'
  },
  input: {
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    marginBottom: 16
  },
  botao: {
    backgroundColor: '#1976d2', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center'
  },
  textoBotao: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16
  }
});
