import {
  collection,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

import { Paciente } from '../models/Paciente';
import { db } from './firebase';

export async function getPacienteById(
  pacienteId: string
) {
  const pacienteRef = doc(
    db,
    'pacientes',
    pacienteId
  );

  const snapshot = await getDoc(pacienteRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Paciente;
}

export async function getPacientes() {
  const pacientesRef = collection(
    db,
    'pacientes'
  );

  const snapshot = await getDocs(
    pacientesRef
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Paciente[];
}