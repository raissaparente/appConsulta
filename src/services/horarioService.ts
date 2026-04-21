import { horariosMock } from '../data/horariosMock';

export function getHorariosDoMedico(medicoId: string) {
  return horariosMock.filter(
    h => h.medicoId === medicoId && h.disponivel
  );
}