import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaConsulta() {
  const roteador = useRouter();

  return (
    <View>
      <Text>Detalhes da consulta</Text>

      <Pressable
        onPress={() =>
          roteador.push('/agendamento/escolher-horario?retorno=true')
        }
      >
        <Text>Marcar retorno</Text>
      </Pressable>
    </View>
  );
}