import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaInicio() {
  const roteador = useRouter();

  return (
    <View>
      <Text>Consultas de hoje</Text>

      <Pressable onPress={() => roteador.push('/consulta/1')}>
        <Text>Consulta com João - 10:00</Text>
      </Pressable>
    </View>
  );
}