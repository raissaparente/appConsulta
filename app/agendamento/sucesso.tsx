import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function TelaSucesso() {
  const roteador = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // replace garante que o usuário não consiga voltar pra tela de sucesso usando o botão de voltar
      roteador.replace('/(abas)/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#4caf50' }}>
        Consulta marcada com sucesso!
      </Text>
      <Text style={{ marginTop: 16, color: '#666' }}>
        Redirecionando para a home...
      </Text>
    </View>
  );
}