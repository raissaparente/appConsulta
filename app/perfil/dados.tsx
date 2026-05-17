import { View, Text, StyleSheet } from 'react-native';

export default function TelaMeusDados() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Dados</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome Completo</Text>
        <Text style={styles.valor}>Funcionário Teste da Silva</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Matrícula</Text>
        <Text style={styles.valor}>123456</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Cargo</Text>
        <Text style={styles.valor}>Recepcionista</Text>
      </View>

      <Text style={styles.rodape}>
        Para alterar seus dados cadastrais, entre em contato com o RH.
      </Text>
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16
  },
  titulo: {
    fontSize: 24, 
    marginBottom: 24
  },
  card: {
    padding: 16, 
    marginBottom: 16
  },
  label: {
    fontSize: 12
  },
  valor: {
    fontSize: 16, 
  },
  rodape: {
    textAlign: 'center', 
    marginTop: 20
  }
});
