import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  titulo: string;
  onPress: () => void;
  style?: object;
};

export default function BotaoPrincipal({ titulo, onPress, style }: Props) {
  return (
    <Pressable style={[styles.botao, style]} onPress={onPress}>
      <Text style={styles.textoBotao}>{titulo}</Text>
    </Pressable>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais desse componente)
const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40
  },
  textoBotao: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16
  }
});
