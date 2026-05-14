import { useEffect, useState } from 'react';

import { getConsultasDoPaciente } from '../services/consultaService';

export function useConsulta(pacienteId: string) {
  const [consultas, setConsultas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarConsultas() {
      try {
        const dados = await getConsultasDoPaciente(pacienteId);
        setConsultas(dados);
      } catch (error) {
        console.log('Erro ao buscar consultas:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarConsultas();
  }, [pacienteId]);

  return {
    consultas,
    loading,
  };
}