import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Paciente } from '../models/Paciente';

type Props = {
  paciente: Paciente | null;
  onEditPress: () => void;
};

export default function CardPacienteDetalhe({
  paciente,
  onEditPress,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Dados Pessoais</Text>

        <Pressable onPress={onEditPress}>
          <Text style={styles.botaoEditar}>EDITAR</Text>
        </Pressable>
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>NOME</Text>
        <Text style={styles.valor}>{paciente?.nome}</Text>
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>CPF</Text>
        <Text style={styles.valor}>{paciente?.cpf}</Text>
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>DATA DE NASCIMENTO</Text>
        <Text style={styles.valor}>
          {paciente?.dataNascimento || 'Não informado'}
        </Text>
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>TELEFONE</Text>
        <Text style={styles.valor}>
          {paciente?.telefone || 'Não informado'}
        </Text>
      </View>

      {paciente?.email && (
        <View style={styles.campo}>
          <Text style={styles.label}>E-MAIL</Text>
          <Text style={styles.valor}>{paciente?.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7DCE3',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  botaoEditar: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E5393',
    textTransform: 'uppercase',
  },
  campo: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E5393',
    letterSpacing: 1,
    marginBottom: 4,
  },

  valor: {
    fontSize: 18,
    color: '#222',
    fontWeight: '400',
  },
});