import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

import { Consulta } from '../models/Consulta';

import { getPacienteById } from '../services/pacienteService';
import { getMedicoById } from '../services/medicoService';
import { getTodasConsultas } from '../services/consultaService';

// Tipo que extende a interface Consulta para incluir os nomes do paciente e médico
type ConsultaComNomes = Consulta & {
  pacienteNome: string;
  medicoNome: string;
  especialidadeMedico: string;
};

// Função auxiliar para verificar se uma data fornecida é igual à data de hoje
function isHoje(data: string) {
  const hoje = new Date()
    .toISOString()
    .split('T')[0]; // Pega apenas a parte da data (YYYY-MM-DD)

  return data.startsWith(hoje);
}

/**
 * Hook customizado para buscar todas as consultas que estão marcadas para a data de hoje.
 */
export function useConsultasHoje() {
  const [consultasHoje, setConsultasHoje] = useState<ConsultaComNomes[]>([]);
  const [loading, setLoading] = useState(true);

  // useFocusEffect garante que os dados recarreguem toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      async function carregarConsultas() {
        setLoading(true);
        try {
          // 1. Busca todas as consultas no banco de dados
          const consultas = await getTodasConsultas();

          // 2. Filtra as consultas para manter apenas as que são para a data de hoje
          const consultasFiltradas = consultas.filter(c => isHoje(c.dataHora));

          // 3. Para cada consulta filtrada, busca o nome do paciente e detalhes do médico
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