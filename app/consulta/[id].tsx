import { View, Text, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useConsulta } from '../../src/hooks/useConsulta';
import BotaoPrincipal from '../../src/components/BotaoPrincipal';
import { atualizarStatusConsulta } from '../../src/services/consultaService';
import { enviarEmailConsulta } from '../../src/services/emailService';

/**
 * Tela que exibe as informações completas de uma consulta.
 * Permite marcar um retorno ou concluir a consulta dependendo do seu status atual.
 */
export default function TelaConsulta() {
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  // Busca a consulta a partir do ID que vem na URL da rota
  const { consulta, medico, paciente } = useConsulta(String(id));

  if (!consulta) return <Text style={styles.loading}>consulta não encontrada</Text>;

  // Quebra a string ISO em Data e Hora para exibir bonitinho
  const [data, hora] = consulta.dataHora.split('T');
  const dataFmt = data.split('-').reverse().join('/');
  const horaFmt = hora.slice(0, 5);

  // Função para marcar a consulta como finalizada no Firebase
  async function concluirConsulta() {
    try {
      await atualizarStatusConsulta(String(id), 'realizada');
      Alert.alert('Sucesso', 'Consulta marcada como concluída!');
      roteador.back(); // Volta pra tela anterior
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível concluir a consulta.');
    }
  }

  // Função para cancelar a consulta no Firebase e disparar e-mail
  async function cancelarConsulta() {
    if (!consulta) return;
    try {
      await atualizarStatusConsulta(String(id), 'cancelada');
      
      // Envia notificação por e-mail se houver paciente e médico cadastrados
      if (paciente && medico) {
        await enviarEmailConsulta({
          pacienteNome: paciente.nome,
          pacienteEmail: paciente.email,
          medicoNome: medico.nome,
          especialidade: medico.especialidade,
          dataHora: consulta.dataHora,
          tipo: 'cancelada'
        });
      }

      Alert.alert('Sucesso', 'Consulta cancelada com sucesso!');
      roteador.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cancelar a consulta.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da Consulta</Text>
      
      <View style={styles.cardInfo}>
        {paciente && (
          <>
            <Text style={styles.label}>Paciente</Text>
            <Text style={styles.valor}>{paciente.nome}</Text>
            {paciente.email && <Text style={styles.subValor}>{paciente.email}</Text>}
            <View style={styles.divisor} />
          </>
        )}

        <Text style={styles.label}>Data</Text>
        <Text style={styles.valor}>{dataFmt}</Text>

        <View style={styles.divisor} />

        <Text style={styles.label}>Horário</Text>
        <Text style={styles.valor}>{horaFmt}</Text>

        <View style={styles.divisor} />

        <Text style={styles.label}>Médico</Text>
        <Text style={styles.valor}>{medico?.nome}</Text>
        <Text style={styles.subValor}>{medico?.especialidade}</Text>
        
        <View style={styles.divisor} />
        
        <Text style={styles.label}>Status</Text>
        <Text style={styles.valorStatus}>{consulta.status}</Text>
      </View>

      {consulta.status === 'realizada' && (
        <BotaoPrincipal
          titulo="Marcar retorno"
          onPress={() =>
            roteador.push(
              `/agendamento/escolher-horario?retorno=true&medicoId=${consulta.medicoId}&pacienteId=${consulta.pacienteId}&pacienteNome=${paciente?.nome}&pacienteCpf=${paciente?.cpf}&medicoNome=${medico?.nome}&especialidade=${medico?.especialidade}`
            )
          }
        />
      )}

      {consulta.status === 'agendada' && (
        <>
          <BotaoPrincipal
            titulo="Consulta Concluída"
            onPress={concluirConsulta}
          />
          <BotaoPrincipal
            titulo="Remarcar Consulta"
            onPress={() =>
              roteador.push(
                `/agendamento/escolher-horario?remarcarId=${consulta.id}&medicoId=${consulta.medicoId}&pacienteId=${consulta.pacienteId}&pacienteNome=${paciente?.nome}&pacienteCpf=${paciente?.cpf}&medicoNome=${medico?.nome}&especialidade=${medico?.especialidade}`
              )
            }
            style={styles.botaoRemarcar}
          />
          <BotaoPrincipal
            titulo="Cancelar Consulta"
            onPress={cancelarConsulta}
            style={styles.botaoCancelar}
          />
        </>
      )}

      {consulta.status === 'cancelada' && (
        <BotaoPrincipal
          titulo="Remarcar Consulta"
          onPress={() =>
            roteador.push(
              `/agendamento/escolher-horario?remarcarId=${consulta.id}&medicoId=${consulta.medicoId}&pacienteId=${consulta.pacienteId}&pacienteNome=${paciente?.nome}&pacienteCpf=${paciente?.cpf}&medicoNome=${medico?.nome}&especialidade=${medico?.especialidade}`
            )
          }
        />
      )}
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  loading: {
    padding: 16
  },
  titulo: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  cardInfo: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 32
  },
  label: {
    fontSize: 14,
    marginBottom: 4
  },
  valor: {
    fontSize: 18,
  },
  subValor: {
    fontSize: 14,
    marginTop: 2,
    color: '#666'
  },
  valorStatus: {
    fontSize: 16,
  },
  divisor: {
    height: 1,
    marginVertical: 16
  },
  botaoRemarcar: {
    marginTop: -28,
    backgroundColor: '#f5f5f5'
  },
  botaoCancelar: {
    marginTop: -28,
    backgroundColor: '#ffe3e3'
  }
});