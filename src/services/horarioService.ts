import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from './firebase';

import { HorarioDisponivel } from '../models/HorarioDisponivel';

export async function getHorariosDoMedico(
  medicoId: string
) {
  const horariosRef = collection(
    db,
    'horarios'
  );

  const q = query(
    horariosRef,
    where('medicoId', '==', medicoId),
    where('disponivel', '==', true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as HorarioDisponivel[];
}

export async function bloquearHorario(
  horarioId: string
) {
  const horarioRef = doc(
    db,
    'horarios',
    horarioId
  );

  await updateDoc(horarioRef, {
    disponivel: false,
  });
}