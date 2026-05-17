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
    borderRadius: 12, 
    marginBottom: 24, 
    elevation: 2
  },
  headerCard: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8
  },
  botaoEditar: {
    padding: 8, 
    backgroundColor: '#eee', 
    borderRadius: 4
  },
  textoBotaoEditar: {
    color: '#333', 
    fontWeight: 'bold'
  },
  nomePaciente: {
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 8
  },
  subtextoPaciente: {
    color: '#666', 
    marginBottom: 4
  }
});
