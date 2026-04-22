import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import CardConsulta from '../../../src/components/CardConsulta';
import { useConsultasHoje } from '../../../src/hooks/useConsultasHoje';

export default function TelaInicio() {
  const { consultasHoje } = useConsultasHoje();
  const roteador = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
        Consultas de hoje
      </Text>

      <FlatList
        data={consultasHoje}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardConsulta
            pacienteNome={item.pacienteNome}
            medicoNome={item.medicoNome}
            dataHora={item.dataHora}
            onPress={() => roteador.push(`/consulta/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text>Nenhuma consulta hoje</Text>
        }
      />
    </View>
  );
}