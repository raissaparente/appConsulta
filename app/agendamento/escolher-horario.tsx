import {
  View,
  Text,
  Pressable,
} from 'react-native';

import {
  useRouter,
  useLocalSearchParams,
} from 'expo-router';

import {
  useEffect,
  useState,
} from 'react';

import { HorarioDisponivel } from '../../src/models/HorarioDisponivel';

import { getHorariosDoMedico } from '../../src/services/horarioService';

export default function TelaEscolherHorario() {
  const roteador = useRouter();

  const params =
    useLocalSearchParams();

  const [horarios, setHorarios] =
    useState<
      HorarioDisponivel[]
    >([]);

  const isRetorno =
    params.retorno === 'true';

  useEffect(() => {
    async function carregarHorarios() {
      try {
        if (!params.medicoId) {
          return;
        }

        const dados =
          await getHorariosDoMedico(
            String(params.medicoId)
          );

        setHorarios(dados);
      } catch (error) {
        console.log(
          'Erro ao carregar horários:',
          error
        );
      }
    }

    carregarHorarios();
  }, []);

  let horariosFiltrados =
    horarios;

  if (
    isRetorno &&
    params.medicoId
  ) {
    horariosFiltrados =
      horariosFiltrados.filter(
        h =>
          h.medicoId ===
          params.medicoId
      );
  }

  return (
    <View>
      <Text>
        Escolher horário
      </Text>

      {horariosFiltrados.map(
        h => (
          <Pressable
            key={h.id}
            onPress={() =>
              roteador.push(
                `/agendamento/confirmar?horarioId=${h.id}&dataHora=${h.dataHora}&medicoId=${h.medicoId}&pacienteId=${params.pacienteId}`
              )
            }
          >
            <Text>
              {h.dataHora}
            </Text>
          </Pressable>
        )
      )}
    </View>
  );
}