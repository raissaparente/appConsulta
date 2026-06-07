import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  titulo: string;
  onPress: () => void;
  style?: object; // Permite sobrescrever os estilos padrão de fora
};

/**
 * Componente base de botão reutilizável.
 * Centraliza o design principal de botões de ação na aplicação inteira.
 */
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
    backgroundColor: '#0F52BA',
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40
  },
  textoBotao: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});
