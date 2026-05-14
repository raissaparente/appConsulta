import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { getMedicos } from '../../src/services/medicoService';
import { Medico } from '../../src/models/Medico';

export default function TelaEscolherMedico() {
  const roteador = useRouter();
  // pega a especialidade escolhida na tela anterior e o pacienteId
  const { especialidade, pacienteId } = useLocalSearchParams();

  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarMedicos() {
      try {
        const todosMedicos = await getMedicos();
        // filtra pra mostrar só os médicos da especialidade que a gente clicou
        const medicosFiltrados = todosMedicos.filter(
          m => m.especialidade === String(especialidade)
        );
        
        setMedicos(medicosFiltrados);
      } catch (error) {
        console.log('Erro ao carregar médicos:', error);
      } finally {
        setLoading(false);
      }
    }

    if (especialidade) {
      carregarMedicos();
    }
  }, [especialidade]);

  if (loading) return <Text>Carregando médicos...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>
        Escolha o médico ({especialidade})
      </Text>

      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={{ padding: 16, backgroundColor: '#eee', marginBottom: 8, borderRadius: 8 }}
            onPress={() =>
              // passa o medicoId escolhido (e o pacienteId) pra tela de escolher horário
              roteador.push(`/agendamento/escolher-horario?medicoId=${item.id}&pacienteId=${pacienteId}`)
            }
          >
            <Text>{item.nome}</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>CRM: {item.crm}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text>Nenhum médico encontrado para essa especialidade.</Text>
        }
      />
    </View>
  );
}
