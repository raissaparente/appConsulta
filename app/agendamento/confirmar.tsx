import { View, Text, Alert, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../src/services/firebase';
import { useState } from 'react';
import { bloquearHorario } from '../../src/services/horarioService';

import BotaoPrincipal from '../../src/components/BotaoPrincipal';

export default function TelaConfirmarAgendamento() {
  const roteador = useRouter();
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
      // 1. cria a consulta no banco com status 'agendada'
      await addDoc(collection(db, 'consultas'), {
        pacienteId,
        medicoId,
        dataHora,
        status: 'agendada',
        tipo: 'primeira' // depois podemos fazer lógica pra saber se é retorno
      });

      // 2. bloqueia o horário para ninguém mais pegar
      await bloquearHorario(horarioId);

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