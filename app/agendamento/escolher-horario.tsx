import { View, Text, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { horariosMock } from '../../src/data/horariosMock';

export default function TelaEscolherHorario() {
  const roteador = useRouter();
  const params = useLocalSearchParams();

  const isRetorno = params.retorno === 'true';

  let horariosFiltrados = horariosMock.filter(h => h.disponivel);

  if (isRetorno && params.medicoId) {
    horariosFiltrados = horariosFiltrados.filter(
      h => h.medicoId === params.medicoId
    );
  }

  return (
    <View>
      <Text>Escolher horário</Text>

      {horariosFiltrados.map(h => (
        <Pressable
          key={h.id}
          onPress={() =>
            roteador.push(
              `/agendamento/confirmar?dataHora=${h.dataHora}&medicoId=${h.medicoId}&pacienteId=${params.pacienteId}`
            )
          }
        >
          <Text>{h.dataHora}</Text>
        </Pressable>
      ))}
    </View>
  );
}