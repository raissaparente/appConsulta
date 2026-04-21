import { pacientesMock } from '../data/pacientesMock';
import { getConsultasDoPaciente } from '../services/consultaService';

export function usePaciente(pacienteId: string) {
  const paciente = pacientesMock.find(p => p.id === pacienteId);

  const consultas = getConsultasDoPaciente(pacienteId);

  return {
    paciente,
    consultas,
  };
}