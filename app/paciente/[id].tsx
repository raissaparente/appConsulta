import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
// hook que busca o paciente pelo id no firebase
import { usePaciente } from '../../src/hooks/usePaciente';

export default function TelaPaciente() {
  // pega o id da url
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  // manda pro hook e recebe os dados
  const { paciente, consultas } = usePaciente(String(id));

  return (
    <View>
      {/* os dados puros vindo do banco */}
      <Text>{paciente?.nome}</Text>

      <Text>Consultas:</Text>

      {/* map pra renderizar a lista de consultas anteriores desse paciente */}
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
          // navega pro fluxo de nova consulta já passando o id do paciente na url
          roteador.push(`/agendamento/escolher-especialidade?pacienteId=${id}`)
        }
      >
        <Text>+ Nova consulta</Text>
      </Pressable>
    </View>
  );
}