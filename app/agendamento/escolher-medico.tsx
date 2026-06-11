import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Medico } from '../../src/models/Medico';
import { getMedicos } from '../../src/services/medicoService';

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
          <Text style={styles.cardLabel}>DADOS DO PACIENTE</Text>
          <Text style={styles.cardInfoNome}>Paciente: {params.pacienteNome}</Text>
          <Text style={styles.cardInfoSub}>CPF: {params.pacienteCpf}</Text>
          <Text style={styles.cardEspec}>Especialidade:{params.especialidade}</Text>
        </View>
      )}

      <Text style={styles.titulo}>
        Selecionar médico
      </Text>

      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
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
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyTexto}>Nenhum médico encontrado para essa especialidade.</Text>
        }
      />
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16
  },
  loading: {
    padding: 16,
  },
  cardResumo: {
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#C9C9C9',
    backgroundColor: '#FFF',
    borderRadius:8,
  },
  cardLabel: {
    fontSize: 10,
    marginBottom: 4,
    color: '#1E5393',
    fontWeight: '600'
  },
  cardEspec:{
    color:'#1E5393',
    fontWeight: '500'
  },
  cardInfoNome: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  cardInfoSub: {
    fontSize: 14,
    marginBottom: 10,
    color:'#1E5393',
    fontWeight:'500'
  },
  titulo: {
    fontSize: 20, 
    marginBottom: 16,
    fontWeight: 'bold'
  },
  botao: {
    padding: 16, 
    marginBottom:6, 
    borderWidth: 1,
    backgroundColor:'#FFF',
    borderRadius: 8,
    borderColor: '#C9C9C9',
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: '500' 
  },
  textoSub: {
    fontSize: 12, 
    color: '#1E5393',
    fontWeight: '500'
  },
  emptyTexto: {
  }
});
