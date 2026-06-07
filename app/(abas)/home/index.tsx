import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import CardConsulta from '../../../src/components/CardConsulta';
//hook do firebase
import { useConsultasHoje } from '../../../src/hooks/useConsultasHoje';

export default function TelaInicio() {
  const { consultasHoje } = useConsultasHoje(); //array de consultas do db
  const roteador = useRouter(); //navegação

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Consultas
      </Text>
      <Text style={styles.titulo2}>
        Agenda de Hoje
      </Text>
      { }
      <FlatList
        contentContainerStyle={styles.cardconsulta}
        data={consultasHoje}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardConsulta
            pacienteNome={item.pacienteNome}
            medicoNome={item.medicoNome}
            dataHora={item.dataHora}
            tipo={item.tipo}
            especialidadeMedico={item.especialidadeMedico}
            onPress={() => roteador.push(`/consulta/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>Nenhuma consulta hoje</Text>
        }
      />
    </View>
  );
}

//BRUNO:estilos globais dessa tela pra alterar depois
const styles = StyleSheet.create({
  container: {
    flex: 1, //pra ocupar toda a tela
    padding: 16
  },
  titulo: {
    fontSize: 22,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: 'bold'
  },
  titulo2: {
    color: '#0F52BA',
    fontWeight: 'bold',
    marginBottom: 16,
    fontSize: 16,
    borderBottomWidth: 2,
    borderColor: '#898989',
    paddingBottom: 8
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 20,
    color: '#0F52BA',
    fontWeight: 'bold'
  },
  cardconsulta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  }
});