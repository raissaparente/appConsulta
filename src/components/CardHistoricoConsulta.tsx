import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Consulta } from '../models/Consulta';

type Props = {
  consulta: Consulta;
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
      <Text style={styles.consultaId}>ID Médico: {consulta.medicoId}</Text>
    </Pressable>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais desse componente)
const styles = StyleSheet.create({
  cardConsulta: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  consultaHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 4
  },
  consultaDataHora: {
    fontWeight: 'bold', 
    fontSize: 16
  },
  consultaStatus: {
    color: '#666', 
    textTransform: 'capitalize'
  },
  consultaId: {
    color: '#888', 
    fontSize: 12
  }
});
