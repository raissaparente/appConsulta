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
        AGENDA DO DIA
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
            status={item.status}
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
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 2,
    marginTop: 2,
    fontWeight: 'bold',
    color: '#0F2042'
  },
  titulo2: {
    fontSize: 12, 
    color: '#200C83',
    marginBottom: 20, 
    borderBottomWidth: 1,
    paddingbottom: 5,
    borderColor: '#7A869A',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#0F52BA',
    fontWeight: 'bold'
  },
  cardconsulta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  }
});