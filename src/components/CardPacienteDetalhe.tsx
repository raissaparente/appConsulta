import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Paciente } from '../models/Paciente';

type Props = {
  paciente: Paciente | null;
  onEditPress: () => void;
};

export default function CardPacienteDetalhe({ paciente, onEditPress }: Props) {
  return (
    <View style={styles.cardPaciente}>
      <View style={styles.headerCard}>
        <Text style={styles.nomePaciente}>{paciente?.nome}</Text>
        <Pressable onPress={onEditPress} style={styles.botaoEditar}>
          <Text style={styles.textoBotaoEditar}>Editar</Text>
        </Pressable>
      </View>
      <Text style={styles.subtextoPaciente}>CPF: {paciente?.cpf}</Text>
      <Text style={styles.subtextoPaciente}>Nascimento: {paciente?.dataNascimento || 'Não informado'}</Text>
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais desse componente)
const styles = StyleSheet.create({
  cardPaciente: {
    backgroundColor: '#fff',
    padding: 16, 
    marginBottom: 24, 
  },
  headerCard: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8
  },
  botaoEditar: {
    backgroundColor: '#eee',
    padding: 8, 
  },
  textoBotaoEditar: {
  },
  nomePaciente: {
    fontSize: 22, 
    marginBottom: 8
  },
  subtextoPaciente: {
    marginBottom: 4
  }
});
