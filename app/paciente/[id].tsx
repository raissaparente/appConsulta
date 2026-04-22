import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePaciente } from '../../src/hooks/usePaciente';

export default function TelaPaciente() {
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  const { paciente, consultas } = usePaciente(String(id));

  return (
    <View>
      <Text>{paciente?.nome}</Text>

      <Text>Consultas:</Text>

      {consultas.map(c => (
        <Pressable
          key={c.id}
          onPress={() => roteador.push(`/consulta/${c.id}`)}
        >
          <Text>{c.dataHora}</Text>
        </Pressable>
      ))}

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