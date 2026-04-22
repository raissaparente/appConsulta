import { useState } from 'react';
import { pacientesMock } from '../data/pacientesMock';

export function useBuscaPaciente() {
  const [texto, setTexto] = useState('');

  const resultados = pacientesMock.filter(p =>
    p.nome.toLowerCase().includes(texto.toLowerCase())
  );

  return {
    texto,
    setTexto,
    resultados,
  };
}