import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePaciente } from '../../src/hooks/usePaciente';

import BotaoPrincipal from '../../src/components/BotaoPrincipal';
import CardPacienteDetalhe from '../../src/components/CardPacienteDetalhe';
import CardHistoricoConsulta from '../../src/components/CardHistoricoConsulta';

export default function TelaPaciente() {
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  const { paciente, consultas, loading } = usePaciente(String(id));

  if (loading) return <Text style={styles.loading}>Carregando dados do paciente...</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* CARD DE DADOS DO PACIENTE */}
      <CardPacienteDetalhe 
        paciente={paciente} 
        onEditPress={() => roteador.push(`/paciente/novo?id=${id}`)} 
      />

      <Text style={styles.tituloSecao}>Consultas</Text>

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

      {/* BOTÃO DE NOVA CONSULTA */}
      <BotaoPrincipal 
        titulo="+ Nova Consulta" 
        onPress={() => roteador.push(`/agendamento/escolher-especialidade?pacienteId=${id}&pacienteNome=${paciente?.nome}&pacienteCpf=${paciente?.cpf}`)} 
      />
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
    fontWeight: 'bold', 
    marginBottom: 12
  },
  textoVazio: {
    color: '#666', 
    fontStyle: 'italic', 
    marginBottom: 24
  }
});