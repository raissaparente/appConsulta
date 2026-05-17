import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../src/services/firebase';

export default function TelaPerfil() {
  const roteador = useRouter();

  // SCRIPT TEMPORÁRIO PARA POPULAR O BANCO
  async function popularBanco() {
    try {
      Alert.alert('Aviso', 'Populando banco, olhe o terminal...');
      
      const medicos = [
        { nome: 'Dr. João Silva', crm: '12345', especialidade: 'Cardiologia' },
        { nome: 'Dra. Maria Souza', crm: '67890', especialidade: 'Dermatologia' },
      ];

      const medicosRefs = [];
      for (const medico of medicos) {
        const docRef = await addDoc(collection(db, 'medicos'), medico);
        medicosRefs.push(docRef.id);
        console.log('Médico criado:', medico.nome, docRef.id);
      }

      // criar 2 pacientes
      const pacientes = [
        { nome: 'Carlos Eduardo', cpf: '111.222.333-44', dataNascimento: '15/05/1980', criadoEm: new Date().toISOString() },
        { nome: 'Fernanda Lima', cpf: '555.666.777-88', dataNascimento: '22/10/1992', criadoEm: new Date().toISOString() }
      ];

      const pacienteRefs = [];
      for (const paciente of pacientes) {
        const docRef = await addDoc(collection(db, 'pacientes'), paciente);
        pacienteRefs.push(docRef.id);
        console.log('Paciente criado:', paciente.nome, docRef.id);
      }

      const hoje = new Date();
      const dataHoje = hoje.toISOString().split('T')[0];

      // criar 2 consultas para HOJE vinculando os pacientes aos médicos
      const consultas = [
        {
          pacienteId: pacienteRefs[0],
          medicoId: medicosRefs[0],
          dataHora: `${dataHoje}T10:00`,
          tipo: 'primeira',
          status: 'agendada'
        },
        {
          pacienteId: pacienteRefs[1],
          medicoId: medicosRefs[1],
          dataHora: `${dataHoje}T14:30`,
          tipo: 'retorno',
          status: 'agendada'
        }
      ];

      for (const consulta of consultas) {
        await addDoc(collection(db, 'consultas'), consulta);
      }

      // CRIAR HORÁRIOS DISPONÍVEIS PARA OS PRÓXIMOS 7 DIAS
      const horasDisponiveis = ['09:00', '10:30', '13:00', '15:30', '17:00'];
      
      for (let i = 0; i < 7; i++) {
        const data = new Date();
        data.setDate(data.getDate() + i);
        const dataFmt = data.toISOString().split('T')[0];
        
        for (const medicoId of medicosRefs) {
          for (const hora of horasDisponiveis) {
            // não criar horário disponível se já foi usado nas consultas fake de hoje
            if (i === 0 && medicoId === medicosRefs[0] && hora === '10:00') continue;
            if (i === 0 && medicoId === medicosRefs[1] && hora === '14:30') continue;

            await addDoc(collection(db, 'horarios'), {
              medicoId,
              dataHora: `${dataFmt}T${hora}`,
              disponivel: true
            });
          }
        }
      }

      console.log('Seed concluído com sucesso!');
      Alert.alert('Sucesso!', 'Dados e horários gerados no Firebase!');
    } catch (error) {
      console.error('Erro no seed:', error);
      Alert.alert('Erro', 'Deu ruim, olha o terminal.');
    }
  }

  return (
    <View style={styles.container}>
      {/* tela crua de perfil, só com a estrutura dos dados */}
      <Text style={styles.titulo}>Perfil do Funcionário</Text>
      
      <Text style={styles.textoNome}>Nome: Funcionário Teste</Text>
      
      <Pressable 
        style={styles.botaoOpcao}
        onPress={() => roteador.push('/perfil/dados')}
      >
        <Text style={styles.textoOpcao}>Meus Dados</Text>
      </Pressable>
      
      <Pressable 
        style={styles.botaoOpcao}
        onPress={() => roteador.push('/perfil/senha')}
      >
        <Text style={styles.textoOpcao}>Alterar Senha</Text>
      </Pressable>

      <View style={styles.areaTeste}>
        <Text style={styles.avisoTeste}>Área de Teste (Remover depois)</Text>
        <Pressable 
          onPress={popularBanco}
          style={styles.botaoTeste}
        >
          <Text style={styles.textoBotaoTeste}>
            Popular Firebase com Pacientes e Consultas (Hoje)
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  titulo: {
    fontSize: 24, 
    marginBottom: 24
  },
  textoNome: {
    marginTop: 20, 
    fontSize: 16
  },
  botaoOpcao: {
    marginTop: 20, 
    padding: 16, 
  },
  textoOpcao: {
  },
  areaTeste: {
    marginTop: 60, 
    padding: 16, 
  },
  avisoTeste: {
    marginBottom: 10, 
  },
  botaoTeste: {
    padding: 12, 
    alignItems: 'center'
  },
  textoBotaoTeste: {
    textAlign: 'center'
  }
});
