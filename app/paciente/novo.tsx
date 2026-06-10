import Card from '@/src/components/Card';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import BotaoPrincipal from '../../src/components/BotaoPrincipal';
import { db } from '../../src/services/firebase';
import { atualizarPaciente, getPacienteById } from '../../src/services/pacienteService';

/**
 * Tela de formulário responsável tanto pela CRIACÃO de um novo paciente
 * quanto pela EDICÃO de um paciente existente.
 * A decisão é tomada baseada na existência do parâmetro `id` na rota.
 */
export default function TelaNovoPaciente() {
  const roteador = useRouter();
  const params = useLocalSearchParams();
  // Se o id foi passado na URL, significa que estamos no modo de edição
  const isEdicao = !!params.id;

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
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
          dataNascimento,
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

        <Card
          title='Informações básicas'
          subtitle='Preencha os dados cadastrais do paciente para registro clínico institucional'
        >
        </Card>
      

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
        style={[styles.input]}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />
      <Text style={styles.label}>Telefone</Text>
      <TextInput
      style={[styles.input]}
      placeholder='(00) 00000-0000'
      keyboardType='phone-pad'
      value={telefone}
      onChangeText={setTelefone}
      />
      <BotaoPrincipal
        titulo={loading ? 'Salvando...' : 'Cadastrar Paciente'}
        onPress={salvarPaciente}
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
    fontSize: 14,
    color: '#1E5393',
    fontWeight: 'bold'
  },
  input: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#C9C9C9'
  }
});
