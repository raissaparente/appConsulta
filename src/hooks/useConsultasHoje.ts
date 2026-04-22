import { consultasMock } from '../data/consultasMock';
import { pacientesMock } from '../data/pacientesMock';
import { medicosMock } from '../data/medicosMock';

function isHoje(data: string) {
  const hoje = new Date().toISOString().split('T')[0];
  return data.startsWith(hoje);
}

export function useConsultasHoje() {
  const consultasHoje = consultasMock
    .filter(c => isHoje(c.dataHora))
    .map(c => {
      const paciente = pacientesMock.find(p => p.id === c.pacienteId);
      const medico = medicosMock.find(m => m.id === c.medicoId);

      return {
        ...c,
        pacienteNome: paciente?.nome ?? 'Paciente',
        medicoNome: medico?.nome ?? 'Médico',
      };
    });

  return { consultasHoje };
}