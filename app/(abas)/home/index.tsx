import React from 'react';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useBuscaPaciente } from '../../../src/hooks/useBuscaPaciente';

// Importação de ícones nativos do Expo
import { FontAwesome } from '@expo/vector-icons'; 

import BotaoPrincipal from '../../../src/components/BotaoPrincipal';
import CardPacienteLista from '../../../src/components/CardPacienteLista';

export default function TelaPesquisa() {
  const roudator = useRouter();
  const { texto, setTexto, resultados } = useBuscaPaciente();

  return (
    <View style={styles.container}>
      {/* Cabeçalho da Tela */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => roudator.back()}>
          <FontAwesome name="arrow-left" size={20} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Pesquisar Paciente</Text>
      </View>

      <Text style={styles.labelInput}>CPF do paciente</Text>
      
      {/* Barra de Busca (Input + Botão lado a lado) */}
      <View style={styles.barrabusca}>
        <TextInput
          placeholder="000.000.000-00"
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
            onPress={() => roudator.push(`/paciente/${item.id}`)}
          />
        )}
        ListFooterComponent={
          <TouchableOpacity 
            style={styles.botaoCadastrar} 
            onPress={() => roudator.push('/paciente/novo')}
          >
            <FontAwesome name="user-plus" size={18} color="#FFFFFF" style={styles.iconeBotao} />
            <Text style={styles.textoBotaoCadastrar}>Cadastrar Novo Paciente</Text>
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
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    color: '#7A7A7A',
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
    backgroundColor: '#00437C',
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