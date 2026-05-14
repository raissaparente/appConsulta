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
        placeholder="Digite o nome ou CPF..."
        value={texto}
        onChangeText={setTexto}
        style={styles.input}
      />

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
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
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            {texto.trim().length === 0 ? (
              <Text style={{ color: '#666', textAlign: 'center' }}>
                Digite um nome ou CPF para buscar pacientes.
              </Text>
            ) : (
              <Text style={{ color: '#666', textAlign: 'center' }}>
                Nenhum paciente encontrado.
              </Text>
            )}
          </View>
        }
        ListFooterComponent={
          <View style={{ marginTop: 24, alignItems: 'center' }}>
            <Pressable
              style={styles.btnNovo}
              onPress={() => roteador.push('/paciente/novo')}
            >
              <Text style={styles.btnNovoTexto}>+ Criar Novo Paciente</Text>
            </Pressable>
          </View>
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
  btnNovo: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnNovoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});