import { View, Text, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function TelaEscolherHorario() {
  const roteador = useRouter();
  const parametros = useLocalSearchParams();

  return (
    <View>
      <Text>Horários disponíveis</Text>

      <Pressable onPress={() => roteador.push('/agendamento/confirmar')}>
        <Text>10:00 - Dr. João</Text>
      </Pressable>
    </View>
  );
}