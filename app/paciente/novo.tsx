import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../src/services/firebase';
import { getPacienteById, atualizarPaciente } from '../../src/services/pacienteService';

export default function TelaNovoPaciente() {
  const roteador = useRouter();
  const params = useLocalSearchParams();
  const isEdicao = !!params.id;

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [loading, setLoading] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(isEdicao);

  useEffect(() => {
    async function carregarDados() {
      if (!isEdicao) return;
      try {
        const paciente = await getPacienteById(String(params.id));
        if (paciente) {
          setNome(paciente.nome);
          setCpf(paciente.cpf);
          setDataNascimento(paciente.dataNascimento || '');
        }
      } catch (error) {
        console.log('Erro ao carregar paciente para edição:', error);
      } finally {
        setCarregandoDados(false);
      }
    }
    carregarDados();
  }, [isEdicao, params.id]);

  async function salvarPaciente() {
    if (!nome.trim() || !cpf.trim() || !dataNascimento.trim()) {
      Alert.alert('Aviso', 'Preencha todos os campos!');
      return;
    }

    setLoading(true);
    try {
      if (isEdicao) {
        await atualizarPaciente(String(params.id), {
          nome,
          cpf,
          dataNascimento
        });
        Alert.alert('Sucesso', 'Paciente atualizado com sucesso!');
        roteador.back(); // Volta pra tela de detalhes
      } else {
        const docRef = await addDoc(collection(db, 'pacientes'), {
          nome,
          cpf,
          dataNascimento,
          criadoEm: new Date().toISOString()
        });

        Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
        roteador.replace(`/paciente/${docRef.id}`);
      }
    } catch (error) {
      console.log('Erro ao salvar paciente:', error);
      Alert.alert('Erro', 'Não foi possível salvar o paciente.');
    } finally {
      setLoading(false);
    }
  }

  if (carregandoDados) {
    return (
      <View style={styles.container}>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {isEdicao ? 'Editar Paciente' : 'Novo Paciente'}
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

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
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
