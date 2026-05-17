import { useEffect, useState } from 'react';

import { getConsultaById } from '../services/consultaService';
import { getMedicoById } from '../services/medicoService';
import { Consulta } from '../models/Consulta';
import { Medico } from '../models/Medico';

/**
 * Hook customizado para buscar os detalhes de uma consulta específica
 * e também os dados do médico associado a ela.
 */
export function useConsulta(consultaId: string) {
  // Estados para armazenar os dados carregados e o status de carregamento
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [medico, setMedico] = useState<Medico | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarConsulta() {
      try {
        // 1. Busca os dados principais da consulta no Firebase
        const dadosConsulta = await getConsultaById(consultaId);
        setConsulta(dadosConsulta);

        // 2. Se a consulta existir e tiver um médico vinculado, busca os dados do médico
        if (dadosConsulta && dadosConsulta.medicoId) {
          const dadosMedico = await getMedicoById(dadosConsulta.medicoId);
          setMedico(dadosMedico);
        }
      } catch (error) {
        console.log('Erro ao buscar consulta:', error);
      } finally {
        // Conclui o carregamento independentemente de dar erro ou sucesso
        setLoading(false);
      }
    }

    if (consultaId) {
      carregarConsulta();
    }
  }, [consultaId]); // O hook re-executa se o consultaId mudar

  return {
    consulta,
    medico,
    loading,
  };
}