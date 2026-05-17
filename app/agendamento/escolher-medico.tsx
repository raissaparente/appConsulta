import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { getMedicos } from '../../src/services/medicoService';
import { Medico } from '../../src/models/Medico';

export default function TelaEscolherMedico() {
  const roteador = useRouter();
  // pega todos os dados que vieram sendo repassados
  const params = useLocalSearchParams();

  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarMedicos() {
      try {
        const todosMedicos = await getMedicos();
        // filtra pra mostrar só os médicos da especialidade que a gente clicou
        const medicosFiltrados = todosMedicos.filter(
          m => m.especialidade === String(params.especialidade)
        );
        
        setMedicos(medicosFiltrados);
      } catch (error) {
        console.log('Erro ao carregar médicos:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.especialidade) {
      carregarMedicos();
    }
  }, [params.especialidade]);

  if (loading) return <Text style={styles.loading}>Carregando médicos...</Text>;

  return (
    <View style={styles.container}>
      {/* CARD PROGRESSIVO: ETAPA 2 */}
      {params.pacienteNome && (
        <View style={styles.cardResumo}>
          <Text style={styles.cardLabel}>Agendando para:</Text>
          <Text style={styles.cardInfoNome}>{params.pacienteNome}</Text>
          <Text style={styles.cardInfoSub}>CPF: {params.pacienteCpf}</Text>
          <View style={styles.linhaDivisoria} />
          <Text style={styles.cardLabel}>Especialidade:</Text>
          <Text style={styles.cardInfoNome}>{params.especialidade}</Text>
        </View>
      )}

      <Text style={styles.titulo}>
        Escolha o médico ({params.especialidade})
      </Text>

      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.botao}
            onPress={() =>
              // repassa todos os dados da URL + o medicoId
              roteador.push(
                `/agendamento/escolher-horario?medicoId=${item.id}&medicoNome=${item.nome}&pacienteId=${params.pacienteId}&pacienteNome=${params.pacienteNome}&pacienteCpf=${params.pacienteCpf}&especialidade=${params.especialidade}`
              )
            }
          >
            <Text style={styles.textoBotao}>{item.nome}</Text>
            <Text style={styles.textoSub}>CRM: {item.crm}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyTexto}>Nenhum médico encontrado para essa especialidade.</Text>
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
  loading: {
    padding: 16,
    color: '#666'
  },
  cardResumo: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#1565c0'
  },
  cardLabel: {
    fontSize: 12,
    color: '#1565c0',
    fontWeight: 'bold',
    marginBottom: 4
  },
  cardInfoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  cardInfoSub: {
    fontSize: 12,
    color: '#666'
  },
  linhaDivisoria: {
    height: 1,
    backgroundColor: '#bbdefb',
    marginVertical: 12
  },
  titulo: {
    fontSize: 20, 
    marginBottom: 16,
    fontWeight: 'bold'
  },
  botao: {
    padding: 16, 
    backgroundColor: '#eee', 
    marginBottom: 8, 
    borderRadius: 8
  },
  textoBotao: {
    fontSize: 16, 
    fontWeight: '500'
  },
  textoSub: {
    fontSize: 12, 
    color: '#666'
  },
  emptyTexto: {
    color: '#666',
    fontStyle: 'italic'
  }
});
