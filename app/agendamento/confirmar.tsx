import { View, Text, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TelaConfirmar() {
  const roteador = useRouter();
  const params = useLocalSearchParams();

  return (
    <View>
      <Text>Confirmar consulta</Text>

      <Text>Paciente: {params.pacienteId}</Text>
      <Text>Médico: {params.medicoId}</Text>
      <Text>Data: {params.dataHora}</Text>

      <Pressable
        onPress={() =>
          roteador.push('/agendamento/sucesso')
        }
      >
        <Text>Confirmar</Text>
      </Pressable>
    </View>
  );
}