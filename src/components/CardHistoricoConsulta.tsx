import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ConsultaPaciente } from '../hooks/usePaciente';

type Props = {
  consulta: ConsultaPaciente;
  onPress: () => void;
};

export default function CardHistoricoConsulta({ consulta, onPress }: Props) {
  const [data, hora] = consulta.dataHora.split('T');
  const dataFmt = data.split('-').reverse().join('/');

  return (
    <TouchableOpacity
      style={[
        styles.cardConsulta,
        { borderLeftColor: consulta.status === 'realizada' ? '#4caf50' : '#2196f3' }
      ]}
      onPress={onPress}
    >
      <View style={styles.consultaHeader}>
        <Text style={styles.consultaMedico}>
          {consulta.medicoNome} {consulta.especialidadeMedico ? `• ${consulta.especialidadeMedico}` : ''}
        </Text>
      </View>
      <Text style={styles.consultaStatus}>{dataFmt} às {hora} {consulta.status}</Text>
    </TouchableOpacity>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais desse componente)
const styles = StyleSheet.create({
  cardConsulta: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#C9C9C9',
    padding: 16,
    marginBottom: 12,
  },
  consultaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  consultaDataHora: {
    fontSize: 16,
  },
  consultaStatus: {
    fontWeight: 'bold',
    fontSize: 14
  },
  consultaMedico: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
    color:'#1E5393'
  }
});
