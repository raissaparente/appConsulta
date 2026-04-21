import { consultasMock } from '../data/consultasMock';

export function getConsultasDoPaciente(pacienteId: string) {
  return consultasMock.filter(c => c.pacienteId === pacienteId);
}

export function getConsultasDoMedico(medicoId: string) {
  return consultasMock.filter(c => c.medicoId === medicoId);
}