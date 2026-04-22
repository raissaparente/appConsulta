import { consultasMock } from '../data/consultasMock';
import { medicosMock } from '../data/medicosMock';

export function useConsulta(consultaId: string) {
  const consulta = consultasMock.find(c => c.id === consultaId);

  const medico = medicosMock.find(m => m.id === consulta?.medicoId);

  return {
    consulta,
    medico,
  };
}