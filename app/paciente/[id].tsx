import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { usePaciente } from '../../src/hooks/usePaciente';

import BotaoPrincipal from '../../src/components/BotaoPrincipal';
import CardHistoricoConsulta from '../../src/components/CardHistoricoConsulta';
import CardPacienteDetalhe from '../../src/components/CardPacienteDetalhe';

export default function TelaPaciente() {
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  const { paciente, consultas, loading } = usePaciente(String(id));

  if (loading) return <Text style={styles.loading}>Carregando dados do paciente...</Text>;

  return (
    <ScrollView style={styles.container}>
       {/* BOTÃO DE NOVA CONSULTA */}
      <BotaoPrincipal 
        titulo="Agendar Nova Consulta" 
        onPress={() => roteador.push(`/agendamento/escolher-especialidade?pacienteId=${id}&pacienteNome=${paciente?.nome}&pacienteCpf=${paciente?.cpf}`)} 
      />
      {/* CARD DE DADOS DO PACIENTE */}
      <CardPacienteDetalhe 
        paciente={paciente} 
        onEditPress={() => roteador.push(`/paciente/novo?id=${id}`)} 
      />

      <Text style={styles.tituloSecao}>Históricos de Consultas</Text>

      {/* LISTA DE CONSULTAS COMO CARDS */}
      {consultas.length === 0 ? (
        <Text style={styles.textoVazio}>
          Nenhuma consulta registrada.
        </Text>
      ) : (
        consultas.map(c => (
          <CardHistoricoConsulta
            key={c.id} 
            consulta={c} 
            onPress={() => roteador.push(`/consulta/${c.id}`)} 
          />
        ))
      )}

    </ScrollView>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16
  },
  loading: {
    padding: 16
  },
  tituloSecao: {
    fontSize: 18, 
    marginBottom: 14,
    color:'#1E5393',
    fontWeight: 'bold'
  },
  textoVazio: {
    marginBottom: 24,
    textAlign: 'left',
    fontWeight: 'bold',
  }
});