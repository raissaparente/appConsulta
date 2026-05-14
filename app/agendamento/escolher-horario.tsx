import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { HorarioDisponivel } from '../../src/models/HorarioDisponivel';
import { getHorariosDoMedico } from '../../src/services/horarioService';

export default function TelaEscolherHorario() {
  const roteador = useRouter();
  // pega os parâmetros que vieram da tela anterior (medicoId, pacienteId, retorno)
  const params = useLocalSearchParams();

  const [horarios, setHorarios] = useState<HorarioDisponivel[]>([]);
  const [loading, setLoading] = useState(true);

  const isRetorno = params.retorno === 'true';

  useEffect(() => {
    async function carregarHorarios() {
      try {
        // se não veio medicoId na url, não tem como buscar horários
        if (!params.medicoId) {
          return;
        }

        // busca os horários disponíveis desse médico específico lá no firebase
        const dados = await getHorariosDoMedico(String(params.medicoId));
        setHorarios(dados);
      } catch (error) {
        console.log('Erro ao carregar horários:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarHorarios();
  }, [params.medicoId]);

  let horariosFiltrados = horarios;

  // lógica extra caso seja um retorno (só garante que o médico seja o mesmo)
  if (isRetorno && params.medicoId) {
    horariosFiltrados = horariosFiltrados.filter(
      h => h.medicoId === params.medicoId
    );
  }

  if (loading) return <Text>Carregando horários...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>
        Escolher horário
      </Text>

      <FlatList
        data={horariosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={{ padding: 16, backgroundColor: '#eee', marginBottom: 8, borderRadius: 8 }}
            onPress={() =>
              // manda tudo que a gente juntou até agora (horario, data, medico, paciente) pra tela de confirmação
              roteador.push(
                `/agendamento/confirmar?horarioId=${item.id}&dataHora=${item.dataHora}&medicoId=${item.medicoId}&pacienteId=${params.pacienteId}`
              )
            }
          >
            <Text>{item.dataHora}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text>Nenhum horário disponível para este médico.</Text>
        }
      />
    </View>
  );
}