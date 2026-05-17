import { useEffect, useState } from 'react';

import { getConsultaById } from '../services/consultaService';
import { getMedicoById } from '../services/medicoService';
import { Consulta } from '../models/Consulta';
import { Medico } from '../models/Medico';

export function useConsulta(consultaId: string) {
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [medico, setMedico] = useState<Medico | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarConsulta() {
      try {
        const dadosConsulta = await getConsultaById(consultaId);
        setConsulta(dadosConsulta);

        if (dadosConsulta && dadosConsulta.medicoId) {
          const dadosMedico = await getMedicoById(dadosConsulta.medicoId);
          setMedico(dadosMedico);
        }
      } catch (error) {
        console.log('Erro ao buscar consulta:', error);
      } finally {
        setLoading(false);
      }
    }

    if (consultaId) {
      carregarConsulta();
    }
  }, [consultaId]);

  return {
    consulta,
    medico,
    loading,
  };
}