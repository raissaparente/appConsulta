import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// importamos a função que acabamos de criar pra pegar todos os médicos
import { getMedicos } from '../../src/services/medicoService';

/**
 * Primeira etapa do fluxo de agendamento de consultas.
 * Permite que o usuário selecione a especialidade desejada para, em seguida,
 * escolher o médico correspondente.
 */
export default function TelaEscolherEspecialidade() {
  const roteador = useRouter();
  // o pacienteId, nome e cpf vêm da url (quando clicamos no botão de nova consulta na tela do paciente)
  const params = useLocalSearchParams();

  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarEspecialidades() {
      try {
        const medicos = await getMedicos();
        // extrai só as especialidades dos médicos
        const todasEspecialidades = medicos.map(m => m.especialidade);
        // usa o Set pra remover as duplicatas (se tiver 3 cardiologistas, só aparece "cardiologia" uma vez)
        const especialidadesUnicas = Array.from(new Set(todasEspecialidades));
        
        setEspecialidades(especialidadesUnicas);
      } catch (error) {
        console.log('Erro ao carregar especialidades:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarEspecialidades();
  }, []);

  if (loading) return <Text style={styles.loading}>Carregando especialidades...</Text>;

  return (
    <View style={styles.container}>
      {/* CARD PROGRESSIVO: ETAPA 1 */}
      {params.pacienteNome && (
        <View style={styles.cardResumo}>
          <Text style={styles.cardLabel}>DADOS DO PACIENTE</Text>
          <Text style={styles.cardInfoNome}>Paciente: <Text style={styles.cardNome}>{params.pacienteNome}</Text></Text>
          <Text style={styles.cardInfoSub}>CPF: {params.pacienteCpf}</Text>
        </View>
      )}

      <Text style={styles.titulo}>
        Selcionar Especialidade
      </Text>

      <FlatList
        data={especialidades}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              // manda a especialidade escolhida e repassa todos os dados do paciente
              roteador.push(`/agendamento/escolher-medico?especialidade=${item}&pacienteId=${params.pacienteId}&pacienteNome=${params.pacienteNome}&pacienteCpf=${params.pacienteCpf}`)
            }
          >
            <Text style={styles.textoBotao}>{item}</Text>
          </TouchableOpacity>
        )}
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
    padding: 16
  },
  cardResumo: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#C9C9C9',
    fontWeight: '500',
  },
  cardLabel: {
    fontSize: 10,
    marginBottom: 4,
    color: '#1E5393',
    fontWeight: '500'
  },
  cardInfoNome: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 2
  },
  cardNome:{
    fontWeight: 'bold',
    fontSize: 14
  },
  cardInfoSub: {
    fontSize: 12,
    color: '#1E5393',
    fontWeight: '500'
  },
  titulo: {
    fontSize: 20, 
    marginBottom: 16,
    fontWeight: '600',
  },
  botao: {
    padding: 16, 
    marginBottom: 6, 
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#C9C9C9',
  },
  textoBotao: {
    fontSize: 16, 
    fontWeight: '600',
    color: '#1E5393'
  }
});