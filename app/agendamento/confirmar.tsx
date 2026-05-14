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
  criarConsulta,
  getConsultasDoMedico,
} from '../../src/services/consultaService';

import { bloquearHorario } from '../../src/services/horarioService';

export default function TelaConfirmar() {
  const roteador = useRouter();

  const params =
    useLocalSearchParams();

  async function confirmarConsulta() {
    try {
      const consultas =
        await getConsultasDoMedico(
          String(params.medicoId)
        );

      const consultaExistente =
        consultas.find(
          c =>
            c.dataHora ===
            String(params.dataHora)
        );

      if (consultaExistente) {
        alert(
          'Já existe uma consulta nesse horário.'
        );

        return;
      }

      await criarConsulta({
        pacienteId: String(
          params.pacienteId
        ),

        medicoId: String(
          params.medicoId
        ),

        dataHora: String(
          params.dataHora
        ),

        tipo: 'primeira',
        status: 'agendada',
      });

      await bloquearHorario(
        String(params.horarioId)
      );

      roteador.push(
        '/agendamento/sucesso'
      );
    } catch (error) {
      console.log(
        'Erro ao criar consulta:',
        error
      );
    }
  }

  return (
    <View>
      <Text>
        Confirmar consulta
      </Text>

      <Text>
        Paciente:
        {' '}
        {params.pacienteId}
      </Text>

      <Text>
        Médico:
        {' '}
        {params.medicoId}
      </Text>

      <Text>
        Data:
        {' '}
        {params.dataHora}
      </Text>

      <Pressable
        onPress={
          confirmarConsulta
        }
      >
        <Text>Confirmar</Text>
      </Pressable>
    </View>
  );
}