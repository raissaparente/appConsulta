import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function TelaSucesso() {
  const roteador = useRouter();

  // Redireciona automaticamente após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      // replace garante que o usuário não consiga voltar pra tela de sucesso usando o botão de voltar
      roteador.replace('/(abas)/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Consulta marcada com sucesso!
      </Text>
      <Text style={styles.subtitulo}>
        Redirecionando para a home...
      </Text>
    </View>
  );
}

// Estilos globais dessa tela pro seu colega alterar depois
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16
  },
  titulo: {
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#4caf50'
  },
  subtitulo: {
    marginTop: 16, 
    color: '#666'
  }
});