import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  pacienteNome: string;
  medicoNome: string;
  dataHora: string;
  tipo?: string;
  especialidadeMedico?: string;
  onPress: () => void;
};

export default function CardConsulta({
  pacienteNome,
  medicoNome,
  dataHora,
  tipo,
  especialidadeMedico,
  onPress,
}: Props) {
  const hora = dataHora.split('T')[1].slice(0, 5);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.hora}>{hora}</Text>

      <View style={styles.conteudo}>
        <Text style={styles.paciente}>{pacienteNome}</Text>
        <Text style={styles.medico}>
          {medicoNome}{especialidadeMedico ? ` • ${especialidadeMedico}` : ''}
        </Text>
        {tipo && <Text style={styles.tipo}>{tipo}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,

  },
  hora: {
    fontSize: 18,
  },
  conteudo: {
    flex: 1,
  },
  paciente: {
    fontSize: 16,
  },
  medico: {
  },
  tipo: {
    fontSize: 12,
    marginTop: 4,
  }
});