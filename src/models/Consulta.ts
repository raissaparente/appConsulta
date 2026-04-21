export type TipoConsulta = 'primeira' | 'retorno';

export interface Consulta {
  id: string;
  pacienteId: string;
  medicoId: string;
  dataHora: string;
  tipo: TipoConsulta;
  status?: 'agendada' | 'cancelada' | 'realizada';
}