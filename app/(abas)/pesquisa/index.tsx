import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaPesquisa() {
  const roteador = useRouter();

  return (
    <View>
      <Text>Pesquisar paciente</Text>

      <Pressable onPress={() => roteador.push('/paciente/1')}>
        <Text>Paciente: Maria Silva</Text>
      </Pressable>
    </View>
  );
}