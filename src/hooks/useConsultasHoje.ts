import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

import { Consulta } from '../models/Consulta';

import { getPacienteById } from '../services/pacienteService';
import { getMedicoById } from '../services/medicoService';
import { getTodasConsultas } from '../services/consultaService';

type ConsultaComNomes = Consulta & {
  pacienteNome: string;
  medicoNome: string;
  especialidadeMedico: string;
};

function isHoje(data: string) {
  const hoje = new Date()
    .toISOString()
    .split('T')[0];

  return data.startsWith(hoje);
}

export function useConsultasHoje() {
  const [consultasHoje, setConsultasHoje] =
    useState<ConsultaComNomes[]>([]);

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function carregarConsultas() {
        setLoading(true);
        try {
          // busca TODAS as consultas do banco ao invés de buscar só do médico ID '1' (que era o antigo dado falso)
          const consultas = await getTodasConsultas();

          const consultasFiltradas = consultas.filter(c => isHoje(c.dataHora));

          const consultasComNomes = await Promise.all(
            consultasFiltradas.map(async c => {
              const paciente = await getPacienteById(c.pacienteId);
              const medico = await getMedicoById(c.medicoId);

              return {
                ...c,
                pacienteNome: paciente?.nome ?? 'Paciente',
                medicoNome: medico?.nome ?? 'Médico',
                especialidadeMedico: medico?.especialidade ?? 'Geral',
              };
            })
          );

          setConsultasHoje(consultasComNomes);
        } catch (error) {
          console.log('Erro ao carregar consultas:', error);
        } finally {
          setLoading(false);
        }
      }

      carregarConsultas();
    }, [])
  );

  return {
    consultasHoje,
    loading,
  };
}