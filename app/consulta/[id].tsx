import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
// esse hook usa o id pra buscar a consulta específica lá no firebase
import { useConsulta } from '../../src/hooks/useConsulta';

// o nome do arquivo [id].tsx indica pro expo router que é uma rota dinâmica
export default function TelaConsulta() {
  // pegamos o id da consulta que veio na url (quando clicamos no card da home)
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  // manda o id pro hook fazer a busca no banco
  const { consulta, medico } = useConsulta(String(id));

  // enquanto não carrega ou se der ruim, mostra isso aqui
  if (!consulta) return <Text>consulta não encontrada</Text>;

  return (
    <View>
      <Text>Consulta</Text>
      <Text>Data: {consulta.dataHora}</Text>
      <Text>Médico: {medico?.nome}</Text>

      <Pressable
        onPress={() =>
          // a gente passa os dados do médico e do paciente pela url pra tela de agendamento 
          // assim a tela lá na frente já sabe quem é quem sem precisar buscar no banco de novo
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