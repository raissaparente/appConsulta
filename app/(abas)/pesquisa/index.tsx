import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useBuscaPaciente } from '../../../src/hooks/useBuscaPaciente';

import BotaoPrincipal from '../../../src/components/BotaoPrincipal';
import CardPacienteLista from '../../../src/components/CardPacienteLista';

export default function TelaPesquisa() {
  const roteador = useRouter();
  const { texto, setTexto, resultados } = useBuscaPaciente();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pesquisar paciente</Text>

      <TextInput
        placeholder="Digite o nome ou CPF..."
        value={texto}
        onChangeText={setTexto}
        style={styles.input}
      />

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <CardPacienteLista 
            paciente={item}
            onPress={() => roteador.push(`/paciente/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {texto.trim().length === 0 ? (
              <Text style={styles.emptyTexto}>
                Digite um nome ou CPF para buscar pacientes.
              </Text>
            ) : (
              <Text style={styles.emptyTexto}>
                Nenhum paciente encontrado.
              </Text>
            )}
          </View>
        }
        ListFooterComponent={
          <BotaoPrincipal
            titulo="+ Criar Novo Paciente"
            onPress={() => roteador.push('/paciente/novo')}
          />
        }
      />
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    marginBottom: 12,
  },
  input: {
    padding: 12,
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyTexto: {
    textAlign: 'center',
  }
});