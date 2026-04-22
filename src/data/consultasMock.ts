import { Consulta } from '../models/Consulta';

export const consultasMock: Consulta[] = [
  // HOJE
  {
    id: '1',
    pacienteId: '1',
    medicoId: '1',
    dataHora: '2026-04-22T09:00',
    tipo: 'primeira',
    status: 'agendada',
  },
  {
    id: '2',
    pacienteId: '2',
    medicoId: '2',
    dataHora: '2026-04-22T10:30',
    tipo: 'retorno',
    status: 'agendada',
  },
  {
    id: '3',
    pacienteId: '3',
    medicoId: '1',
    dataHora: '2026-04-22T14:00',
    tipo: 'retorno',
    status: 'agendada',
  },

  // OUTROS DIAS
  {
    id: '4',
    pacienteId: '1',
    medicoId: '3',
    dataHora: '2026-04-25T11:00',
    tipo: 'primeira',
    status: 'agendada',
  },
  {
    id: '5',
    pacienteId: '4',
    medicoId: '2',
    dataHora: '2026-04-28T15:30',
    tipo: 'primeira',
    status: 'agendada',
  },
];