import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaEscolherEspecialidade() {
  const roteador = useRouter();

  return (
    <View>
      <Text>Escolha a especialidade</Text>

      <Pressable
        onPress={() =>
          roteador.push('/agendamento/escolher-horario?especialidade=cardio')
        }
      >
        <Text>Cardiologia</Text>
      </Pressable>
    </View>
  );
}