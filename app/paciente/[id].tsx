import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePaciente } from '../../src/hooks/usePaciente';

export default function TelaPaciente() {
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  const { paciente, consultas, loading } = usePaciente(String(id));

  if (loading) return <Text style={styles.loading}>Carregando dados do paciente...</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* CARD DE DADOS DO PACIENTE */}
      <View style={styles.cardPaciente}>
        <Text style={styles.nomePaciente}>{paciente?.nome}</Text>
        <Text style={styles.subtextoPaciente}>CPF: {paciente?.cpf}</Text>
        <Text style={styles.subtextoPaciente}>Nascimento: {paciente?.dataNascimento || 'Não informado'}</Text>
      </View>

      <Text style={styles.tituloSecao}>Consultas</Text>

      {/* LISTA DE CONSULTAS COMO CARDS */}
      {consultas.length === 0 ? (
        <Text style={styles.textoVazio}>
          Nenhuma consulta registrada.
        </Text>
      ) : (
        consultas.map(c => {
          const [data, hora] = c.dataHora.split('T');
          const dataFmt = data.split('-').reverse().join('/');
          
          return (
            <Pressable
              key={c.id}
              style={[
                styles.cardConsulta,
                { borderLeftColor: c.status === 'concluída' ? '#4caf50' : '#2196f3' }
              ]}
              onPress={() => roteador.push(`/consulta/${c.id}`)}
            >
              <View style={styles.consultaHeader}>
                <Text style={styles.consultaDataHora}>{dataFmt} às {hora}</Text>
                <Text style={styles.consultaStatus}>{c.status}</Text>
              </View>
              <Text style={styles.consultaId}>ID Médico: {c.medicoId}</Text>
            </Pressable>
          );
        })
      )}

      {/* BOTÃO DE NOVA CONSULTA */}
      <Pressable
        style={styles.botaoNova}
        onPress={() => roteador.push(`/agendamento/escolher-especialidade?pacienteId=${id}`)}
      >
        <Text style={styles.textoBotao}>+ Nova Consulta</Text>
      </Pressable>
    </ScrollView>
  );
}

// Estilos globais dessa tela pro seu colega alterar depois
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16
  },
  loading: {
    padding: 16
  },
  cardPaciente: {
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 24, 
    elevation: 2
  },
  nomePaciente: {
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 8
  },
  subtextoPaciente: {
    color: '#666', 
    marginBottom: 4
  },
  tituloSecao: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 12
  },
  textoVazio: {
    color: '#666', 
    fontStyle: 'italic', 
    marginBottom: 24
  },
  cardConsulta: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  consultaHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 4
  },
  consultaDataHora: {
    fontWeight: 'bold', 
    fontSize: 16
  },
  consultaStatus: {
    color: '#666', 
    textTransform: 'capitalize'
  },
  consultaId: {
    color: '#888', 
    fontSize: 12
  },
  botaoNova: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40
  },
  textoBotao: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16
  }
});