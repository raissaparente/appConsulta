import { useEffect, useState } from 'react';
import { getConsultasDoPaciente } from '../services/consultaService';
import { getPacienteById } from '../services/pacienteService';
import { Paciente } from '../models/Paciente';
import { Consulta } from '../models/Consulta';

export function usePaciente(pacienteId: string) {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosPaciente = await getPacienteById(pacienteId);
        const dadosConsultas = await getConsultasDoPaciente(pacienteId);
        
        setPaciente(dadosPaciente);
        setConsultas(dadosConsultas);
      } catch (error) {
        console.log('Erro ao buscar paciente:', error);
      } finally {
        setLoading(false);
      }
    }

    if (pacienteId) {
      carregarDados();
    }
  }, [pacienteId]);

  return {
    paciente,
    consultas,
    loading
  };
}