import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useBuscaPaciente } from '../../../src/hooks/useBuscaPaciente';

export default function TelaPesquisa() {
  const roteador = useRouter();
  const { texto, setTexto, resultados } = useBuscaPaciente();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pesquisar paciente</Text>

      <TextInput
        placeholder="Digite o nome..."
        value={texto}
        onChangeText={setTexto}
        style={styles.input}
      />

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => roteador.push(`/paciente/${item.id}`)}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.sub}>CPF: {item.cpf}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          texto.length > 0 ? (
            <Text>Nenhum paciente encontrado</Text>
          ) : null
        }
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
  },
  sub: {
    color: '#666',
    marginTop: 4,
  },
});