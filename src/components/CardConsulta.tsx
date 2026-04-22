import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  pacienteNome: string;
  medicoNome: string;
  dataHora: string;
  onPress: () => void;
};

export default function CardConsulta({
  pacienteNome,
  medicoNome,
  dataHora,
  onPress,
}: Props) {
  const hora = dataHora.split('T')[1].slice(0, 5);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.hora}>{hora}</Text>

      <View>
        <Text style={styles.paciente}>{pacienteNome}</Text>
        <Text style={styles.medico}>{medicoNome}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  hora: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paciente: {
    fontSize: 16,
    fontWeight: '600',
  },
  medico: {
    color: '#666',
  },
});