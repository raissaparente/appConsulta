import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import BotaoPrincipal from '../../src/components/BotaoPrincipal';

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

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Senha</Text>

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

      <BotaoPrincipal 
        titulo="Atualizar Senha"
        onPress={atualizarSenha} 
      />
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
    marginBottom: 24
  },
  label: {
    marginBottom: 4, 
  },
  input: {
    padding: 12, 
    marginBottom: 16
  }
});
