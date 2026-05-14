import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Consulta } from '../models/Consulta';
import { db } from './firebase';

export async function getConsultasDoPaciente(
  pacienteId: string
) {
  const consultasRef = collection(db, 'consultas');

  const q = query(
    consultasRef,
    where('pacienteId', '==', pacienteId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data(),
})) as Consulta[];
}

export async function getConsultasDoMedico(
  medicoId: string
) {
  const consultasRef = collection(db, 'consultas');

  const q = query(
    consultasRef,
    where('medicoId', '==', medicoId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data(),
})) as Consulta[];
}

export async function criarConsulta(
  dados: Omit<Consulta, 'id'>
) {
  try {
    const docRef = await addDoc(
      collection(db, 'consultas'),
      dados
    );

    return {
      id: docRef.id,
      ...dados,
    };
  } catch (error) {
    console.log('Erro ao criar consulta:', error);
    throw error;
  }
}

export async function atualizarStatusConsulta(
  consultaId: string,
  status: 'agendada' | 'cancelada' | 'realizada'
) {
  try {
    const consultaRef = doc(
      db,
      'consultas',
      consultaId
    );

    await updateDoc(consultaRef, {
      status,
    });

    console.log('Status atualizado!');
  } catch (error) {
    console.log(
      'Erro ao atualizar status:',
      error
    );

    throw error;
  }
}

export async function deletarConsulta(
  consultaId: string
) {
  try {
    const consultaRef = doc(
      db,
      'consultas',
      consultaId
    );

    await deleteDoc(consultaRef);

    console.log('Consulta deletada!');
  } catch (error) {
    console.log(
      'Erro ao deletar consulta:',
      error
    );

    throw error;
  }
}