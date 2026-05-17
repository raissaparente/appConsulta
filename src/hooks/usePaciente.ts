import { useEffect, useState } from 'react';
import { getConsultasDoPaciente } from '../services/consultaService';
import { getPacienteById } from '../services/pacienteService';
import { getMedicoById } from '../services/medicoService';
import { Paciente } from '../models/Paciente';
import { Consulta } from '../models/Consulta';

// Extende a Consulta para já trazer os dados do médico mapeados e facilitar o uso na tela
export type ConsultaPaciente = Consulta & {
  medicoNome: string;
  especialidadeMedico: string;
};

/**
 * Hook para carregar as informações de um paciente e todas as suas consultas associadas
 * junto com os dados detalhados do médico em cada consulta.
 */
export function usePaciente(pacienteId: string) {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [consultas, setConsultas] = useState<ConsultaPaciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        // Busca os dados básicos do paciente
        const dadosPaciente = await getPacienteById(pacienteId);
        
        // Busca o histórico de consultas do paciente
        const dadosConsultas = await getConsultasDoPaciente(pacienteId);
        
        // Mapeia cada consulta para buscar e embutir os dados do médico responsável
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