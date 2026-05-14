import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

// importamos a função que acabamos de criar pra pegar todos os médicos
import { getMedicos } from '../../src/services/medicoService';

export default function TelaEscolherEspecialidade() {
  const roteador = useRouter();
  // o pacienteId vem da url (quando clicamos no botão de nova consulta na tela do paciente)
  const { pacienteId } = useLocalSearchParams();

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

  if (loading) return <Text>Carregando especialidades...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>
        Escolha a especialidade
      </Text>

      <FlatList
        data={especialidades}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            style={{ padding: 16, backgroundColor: '#eee', marginBottom: 8, borderRadius: 8 }}
            onPress={() =>
              // manda a especialidade escolhida e repassa o pacienteId pra próxima tela
              roteador.push(`/agendamento/escolher-medico?especialidade=${item}&pacienteId=${pacienteId}`)
            }
          >
            <Text>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}