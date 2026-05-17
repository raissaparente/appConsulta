import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import CardConsulta from '../../../src/components/CardConsulta';
// esse hook aqui já tá pegando os dados reais do firebase lá do banco!
import { useConsultasHoje } from '../../../src/hooks/useConsultasHoje';

export default function TelaInicio() {
  // consultasHoje é o nosso array com os dados que vieram do banco
  const { consultasHoje } = useConsultasHoje();
  // useRouter serve pra gente navegar entre as telas
  const roteador = useRouter();

  return (
    // a view principal precisa flex: 1 pra ocupar a tela toda
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Consultas de hoje
      </Text>

      {/* flatlist é a lista otimizada do react native. 
          ela recebe nossos dados do firebase aqui no 'data' */}
      <FlatList
        data={consultasHoje}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // esse é o componente que você vai focar em estilizar depois
          <CardConsulta
            pacienteNome={item.pacienteNome}
            medicoNome={item.medicoNome}
            dataHora={item.dataHora}
            onPress={() =>
              // quando clica no card, a gente manda o usuário pra tela de detalhes com o id da consulta
              roteador.push(`/consulta/${item.id}`)
            }
          />
        )}
        // isso aqui é o que aparece se o firebase retornar vazio
        ListEmptyComponent={
          <Text style={styles.textoVazio}>Nenhuma consulta hoje</Text>
        }
      />
    </View>
  );
}

// Estilos globais dessa tela pro seu colega alterar depois
const styles = StyleSheet.create({
  container: {
    flex: 1, 
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