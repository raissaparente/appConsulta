import { useEffect, useState } from 'react';
import { getConsultasDoPaciente } from '../services/consultaService';
import { getPacienteById } from '../services/pacienteService';
import { getMedicoById } from '../services/medicoService';
import { Paciente } from '../models/Paciente';
import { Consulta } from '../models/Consulta';

export type ConsultaPaciente = Consulta & {
  medicoNome: string;
  especialidadeMedico: string;
};

export function usePaciente(pacienteId: string) {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [consultas, setConsultas] = useState<ConsultaPaciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosPaciente = await getPacienteById(pacienteId);
        const dadosConsultas = await getConsultasDoPaciente(pacienteId);
        
        const consultasComMedico = await Promise.all(
          dadosConsultas.map(async (c) => {
            const medico = await getMedicoById(c.medicoId);
            return {
              ...c,
              medicoNome: medico?.nome || 'Médico não encontrado',
              especialidadeMedico: medico?.especialidade || '',
            };
          })
        );
        
        setPaciente(dadosPaciente);
        setConsultas(consultasComMedico);
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