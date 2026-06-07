import { View, Text, Alert, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../src/services/firebase';
import { useState } from 'react';
import { bloquearHorario } from '../../src/services/horarioService';
import { getPacienteById } from '../../src/services/pacienteService';
import { enviarEmailConsulta } from '../../src/services/emailService';

import BotaoPrincipal from '../../src/components/BotaoPrincipal';

/**
 * Última etapa do fluxo de agendamento.
 * Revisa todos os dados coletados nas etapas anteriores via URL (params)
 * e finaliza gravando a consulta no banco de dados.
 */
export default function TelaConfirmarAgendamento() {
  const roteador = useRouter();
  // params carrega todo o histórico do agendamento (paciente, médico, hora)
  const params = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  // o params converte os arrays em string caso a url venha maluca
  const pacienteId = String(params.pacienteId);
  const medicoId = String(params.medicoId);
  const dataHora = String(params.dataHora);
  const horarioId = String(params.horarioId);
  const pacienteNome = String(params.pacienteNome);
  const pacienteCpf = String(params.pacienteCpf);
  const especialidade = String(params.especialidade);
  const medicoNome = String(params.medicoNome);
  const isRetorno = params.retorno === 'true';
  const remarcarId = params.remarcarId ? String(params.remarcarId) : null;

  // formata a data ("2026-05-15T14:30") pra ficar legível pro usuário
  const dataParte = dataHora.split('T')[0];
  const horaParte = dataHora.split('T')[1];
  const dataBr = dataParte.split('-').reverse().join('/');

  async function confirmarAgendamento() {
    if (!pacienteId || !medicoId || !dataHora || !horarioId) {
      Alert.alert('Erro', 'Faltam dados para confirmar o agendamento.');
      return;
    }

    setLoading(true);

    try {
      if (remarcarId) {
        // 1. Atualiza a consulta no banco com a nova data/hora e reseta status para 'agendada'
        const consultaRef = doc(db, 'consultas', remarcarId);
        await updateDoc(consultaRef, {
          dataHora,
          status: 'agendada'
        });
      } else {
        // 1. Cria a consulta no banco com status 'agendada'
        await addDoc(collection(db, 'consultas'), {
          pacienteId,
          medicoId,
          dataHora,
          status: 'agendada',
          tipo: isRetorno ? 'retorno' : 'primeira'
        });
      }

      // 2. Bloqueia o horário para ninguém mais pegar
      await bloquearHorario(horarioId);

      // 3. Busca o e-mail do paciente para enviar a notificação correspondente
      const paciente = await getPacienteById(pacienteId);
      const pacienteEmail = paciente?.email;

      // 4. Envia o e-mail de confirmação ou reagendamento
      const tipoNotificacao = remarcarId ? 'remarcada' : (isRetorno ? 'retorno' : 'marcada');
      await enviarEmailConsulta({
        pacienteNome,
        pacienteEmail,
        medicoNome,
        especialidade,
        dataHora,
        tipo: tipoNotificacao
      });

      // manda pra tela de sucesso
      roteador.push('/agendamento/sucesso');
    } catch (error) {
      console.log('Erro ao confirmar:', error);
      Alert.alert('Erro', 'Não foi possível confirmar o agendamento.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo do Agendamento</Text>

      <View style={styles.cardResumo}>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.valor}>{pacienteNome}</Text>
        <Text style={styles.valorSub}>CPF: {pacienteCpf}</Text>

        <View style={styles.divisor} />

        <Text style={styles.label}>Médico</Text>
        <Text style={styles.valor}>{medicoNome}</Text>
        <Text style={styles.valorSub}>{especialidade}</Text>

        <View style={styles.divisor} />

        <Text style={styles.label}>Data e Hora</Text>
        <Text style={styles.valorDestaque}>
          {dataBr} às {horaParte}
        </Text>
      </View>

      <BotaoPrincipal 
        titulo={loading ? 'Processando...' : 'Confirmar Agendamento'}
        onPress={confirmarAgendamento} 
      />
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  titulo: {
    fontSize: 22, 
    marginBottom: 24, 
    textAlign: 'center'
  },
  cardResumo: {
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
  valorSub: {
    fontSize: 14, 
    marginTop: 2
  },
  divisor: {
    height: 1, 
    marginVertical: 16
  },
  valorDestaque: {
    fontSize: 20, 
  }
});