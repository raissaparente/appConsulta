import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ConsultaPaciente } from '../hooks/usePaciente';

type Props = {
  consulta: ConsultaPaciente;
  onPress: () => void;
};

export default function CardHistoricoConsulta({ consulta, onPress }: Props) {
  const [data, hora] = consulta.dataHora.split('T');
  const dataFmt = data.split('-').reverse().join('/');
  
  return (
    <Pressable
      style={[
        styles.cardConsulta,
        { borderLeftColor: consulta.status === 'realizada' ? '#4caf50' : '#2196f3' }
      ]}
      onPress={onPress}
    >
      <View style={styles.consultaHeader}>
        <Text style={styles.consultaDataHora}>{dataFmt} às {hora}</Text>
        <Text style={styles.consultaStatus}>{consulta.status}</Text>
      </View>
      <Text style={styles.consultaMedico}>
        {consulta.medicoNome} {consulta.especialidadeMedico ? `• ${consulta.especialidadeMedico}` : ''}
      </Text>
    </Pressable>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais desse componente)
const styles = StyleSheet.create({
  cardConsulta: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
  },
  consultaHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 4
  },
  consultaDataHora: {
    fontSize: 16
  },
  consultaStatus: {
  },
  consultaMedico: {
    fontSize: 14,
    marginTop: 4
  }
});
