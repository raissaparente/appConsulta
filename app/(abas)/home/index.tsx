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
        Consultas de hoje
      </Text>

      { }
      <FlatList
        data={consultasHoje}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          //BRUNO: ESTILIZAR ESSE CARD
          <CardConsulta
            pacienteNome={item.pacienteNome}
            medicoNome={item.medicoNome}
            dataHora={item.dataHora}
            tipo={item.tipo}
            especialidadeMedico={item.especialidadeMedico}
            onPress={() =>
              //nav pro detalhe da consulta
              roteador.push(`/consulta/${item.id}`)
            }
          />
        )}
        //empty state se n tiver nada pra hj:
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textoVazio: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20
  }
});