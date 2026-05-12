import { doc, getDoc } from 'firebase/firestore';

import { Medico } from '../models/Medico';
import { db } from './firebase';

export async function getMedicoById(
  medicoId: string
) {
  const medicoRef = doc(
    db,
    'medicos',
    medicoId
  );

  const snapshot = await getDoc(medicoRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Medico;
}