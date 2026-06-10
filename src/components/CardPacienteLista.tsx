import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Paciente } from '../models/Paciente';

type Props = {
  paciente: Paciente;
  onPress: () => void;
};

/**
 * Componente que exibe de forma resumida os dados de um paciente em listas,
 * com um ícone chevron indicando que ele é clicável para ir aos detalhes.
 */
export default function CardPacienteLista({ paciente, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.conteudo}>
        <Text style={styles.nome}>{paciente.nome}</Text>
        <Text style={styles.cpf}>CPF                                          {paciente.cpf}</Text>
        <Text style={styles.dt}>Data de Nascimento                      {paciente.dataNascimento || 'Não informado'}</Text>
      </View>
      
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </Pressable>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais desse componente)
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#C9C9C9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conteudo: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    marginBottom: 4,
  },
  cpf: {
    fontSize: 14,
    marginTop: 8,
    paddingVertical: 1,
    color: '#1E5393',
    borderBottomWidth: 1,
    borderColor: '#C9C9C9',
    fontWeight: 'bold',
    borderRadius: 8
  },
  dt:{
    fontSize: 14,
    marginTop: 8,
    paddingVertical: 1,
    color: '#1E5393',
    fontWeight: 'bold',
  }
});
