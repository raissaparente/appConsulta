export interface Paciente {
  id: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  numeroSus: string;
  endereco: string;
  cep: string;
  telefone?: string;
}