import { HorarioDisponivel } from '../models/HorarioDisponivel';

export const horariosMock: HorarioDisponivel[] = [
  // CARDIOLOGIA (medico 1)
  {
    id: '1',
    medicoId: '1',
    dataHora: '2026-04-22T11:00',
    disponivel: true,
  },
  {
    id: '2',
    medicoId: '1',
    dataHora: '2026-04-22T15:00',
    disponivel: false,
  },
  {
    id: '3',
    medicoId: '1',
    dataHora: '2026-04-23T09:00',
    disponivel: true,
  },

  // DERMATOLOGIA (medico 2)
  {
    id: '4',
    medicoId: '2',
    dataHora: '2026-04-22T13:00',
    disponivel: true,
  },
  {
    id: '5',
    medicoId: '2',
    dataHora: '2026-04-23T10:00',
    disponivel: true,
  },

  // ORTOPEDIA (medico 3)
  {
    id: '6',
    medicoId: '3',
    dataHora: '2026-04-22T16:00',
    disponivel: true,
  },
  {
    id: '7',
    medicoId: '3',
    dataHora: '2026-04-24T08:30',
    disponivel: true,
  },
];