import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CardPacienteLista from '../../../src/components/CardPacienteLista';
import { useBuscaPaciente } from '../../../src/hooks/useBuscaPaciente';

export default function TelaPesquisa() {
  const roteador = useRouter();
  const { texto, setTexto, resultados } = useBuscaPaciente();

  return (
    <View style={styles.container}>
      {/* Cabeçalho da Tela */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => roteador.back()}>
          <Feather name="arrow-left" size={20} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Pesquisar Paciente</Text>
      </View>

      <Text style={styles.labelInput}>Nome/CPF do Paciente</Text>

      {/* Barra de Busca*/}
      <View style={styles.barrabusca}>
        <TextInput
          placeholder="Digite seu nome ou CPF..."
          placeholderTextColor="#A9A9A9"
          value={texto}
          onChangeText={setTexto}
          style={styles.input}
        />
        <TouchableOpacity style={styles.botaoBuscar}>
          <Text style={styles.textoBotaoBuscar}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Pacientes Encontrados e Botão de Cadastrar */}
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
        ListFooterComponent={
          <TouchableOpacity
            style={styles.botaoCadastrar}
            onPress={() => roteador.push('/paciente/novo')}
          >
            <Feather
              name="user-plus"
              size={18}
              color="#FFF"
              style={styles.iconeBotao}
            />
            <Text style={styles.textoBotaoCadastrar}>
              Cadastrar Novo Paciente
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 50
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 16,
  },
  labelInput: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E5393',
    marginBottom: 4,
  },
  barrabusca: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: 4,
    fontSize: 16,
    marginRight: 8,
  },
  botaoBuscar: {
    width: '25%',
    height: 48,
    backgroundColor: '#1E5393',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoBuscar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  botaoCadastrar: {
    flexDirection: 'row',
    backgroundColor: '#00437C',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  iconeBotao: {
    marginRight: 8,
  },
  textoBotaoCadastrar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  }
});