import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../src/services/firebase';

export default function TelaNovoPaciente() {
  const roteador = useRouter();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [loading, setLoading] = useState(false);

  async function salvarPaciente() {
    if (!nome.trim() || !cpf.trim() || !dataNascimento.trim()) {
      Alert.alert('Aviso', 'Preencha todos os campos!');
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'pacientes'), {
        nome,
        cpf,
        dataNascimento,
        criadoEm: new Date().toISOString()
      });

      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
      // volta pra tela anterior e já entra nos detalhes desse novo paciente
      roteador.replace(`/paciente/${docRef.id}`);
    } catch (error) {
      console.log('Erro ao salvar paciente:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o paciente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Novo Paciente
      </Text>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: João da Silva"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder="000.000.000-00"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={[styles.input, { marginBottom: 32 }]}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <Pressable
        style={styles.botao}
        onPress={salvarPaciente}
        disabled={loading}
      >
        <Text style={styles.textoBotao}>
          {loading ? 'Salvando...' : 'Cadastrar Paciente'}
        </Text>
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
    backgroundColor: '#4caf50', 
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
