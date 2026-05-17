import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Paciente } from '../models/Paciente';

type Props = {
  paciente: Paciente;
  onPress: () => void;
};

export default function CardPacienteLista({ paciente, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.conteudo}>
        <Text style={styles.nome}>{paciente.nome}</Text>
        <Text style={styles.subtexto}>CPF: {paciente.cpf}</Text>
        <Text style={styles.subtexto}>Nasc: {paciente.dataNascimento || 'Não informado'}</Text>
      </View>
      
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </Pressable>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais desse componente)
const styles = StyleSheet.create({
  card: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  conteudo: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtexto: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  }
});
