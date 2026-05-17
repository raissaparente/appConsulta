import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

// importamos a função que acabamos de criar pra pegar todos os médicos
import { getMedicos } from '../../src/services/medicoService';

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
          <Text style={styles.cardLabel}>Agendando para:</Text>
          <Text style={styles.cardInfoNome}>{params.pacienteNome}</Text>
          <Text style={styles.cardInfoSub}>CPF: {params.pacienteCpf}</Text>
        </View>
      )}

      <Text style={styles.titulo}>
        Escolha a especialidade
      </Text>

      <FlatList
        data={especialidades}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            style={styles.botao}
            onPress={() =>
              // manda a especialidade escolhida e repassa todos os dados do paciente
              roteador.push(`/agendamento/escolher-medico?especialidade=${item}&pacienteId=${params.pacienteId}&pacienteNome=${params.pacienteNome}&pacienteCpf=${params.pacienteCpf}`)
            }
          >
            <Text style={styles.textoBotao}>{item}</Text>
          </Pressable>
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
    marginBottom: 24,
  },
  cardLabel: {
    fontSize: 12,
    marginBottom: 4
  },
  cardInfoNome: {
    fontSize: 16,
  },
  cardInfoSub: {
    fontSize: 12,
  },
  titulo: {
    fontSize: 20, 
    marginBottom: 16,
  },
  botao: {
    padding: 16, 
    marginBottom: 8, 
  },
  textoBotao: {
    fontSize: 16, 
  }
});