import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useConsulta } from '../../src/hooks/useConsulta';

export default function TelaConsulta() {
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  const { consulta, medico } = useConsulta(String(id));

  if (!consulta) return <Text>Consulta não encontrada</Text>;

  return (
    <View>
      <Text>Consulta</Text>
      <Text>Data: {consulta.dataHora}</Text>
      <Text>Médico: {medico?.nome}</Text>

      <Pressable
        onPress={() =>
          roteador.push(
            `/agendamento/escolher-horario?retorno=true&medicoId=${consulta.medicoId}&pacienteId=${consulta.pacienteId}`
          )
        }
      >
        <Text>Marcar retorno</Text>
      </Pressable>
    </View>
  );
}