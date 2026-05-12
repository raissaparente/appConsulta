import { useEffect, useState } from 'react';

import { Paciente } from '../models/Paciente';
import { getPacientes } from '../services/pacienteService';

export function useBuscaPaciente() {
  const [texto, setTexto] = useState('');

  const [pacientes, setPacientes] =
    useState<Paciente[]>([]);

  useEffect(() => {
    async function carregarPacientes() {
      try {
        const dados =
          await getPacientes();

        setPacientes(dados);
      } catch (error) {
        console.log(
          'Erro ao buscar pacientes:',
          error
        );
      }
    }

    carregarPacientes();
  }, []);

  const resultados = pacientes.filter(p =>
    p.nome
      .toLowerCase()
      .includes(texto.toLowerCase())
  );

  return {
    texto,
    setTexto,
    resultados,
  };
}