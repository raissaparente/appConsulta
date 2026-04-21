import { View, Text, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TelaPaciente() {
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  return (
    <View>
      <Text>Paciente {id}</Text>

      <Text>Consultas:</Text>

      <Pressable onPress={() => roteador.push('/consulta/1')}>
        <Text>Consulta 10/04</Text>
      </Pressable>

      <Pressable
        onPress={() =>
          roteador.push(`/agendamento/escolher-especialidade?pacienteId=${id}`)
        }
      >
        <Text>+ Nova consulta</Text>
      </Pressable>
    </View>
  );
}