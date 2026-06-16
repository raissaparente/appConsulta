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
    backgroundColor: '#1E5393',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    height: 'auto',
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  }
});
