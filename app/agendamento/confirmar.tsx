import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaConfirmar() {
  const roteador = useRouter();

  return (
    <View>
      <Text>Resumo da consulta</Text>

      <Pressable onPress={() => roteador.push('/agendamento/sucesso')}>
        <Text>Confirmar</Text>
      </Pressable>
    </View>
  );
}