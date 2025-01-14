import { db } from '@/fireBase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { NotaFormData } from '@/models/Nota';

const notasCollection = collection(db, 'notas');

// Buscar todas as notas
export const fetchNotas = async (): Promise<NotaFormData[]> => {
  try {
    console.log('Fetching all notes...');
    const querySnapshot = await getDocs(notasCollection);
    const notas: NotaFormData[] = [];
    querySnapshot.forEach((doc) => {
      notas.push({ id: doc.id, ...doc.data() } as unknown as NotaFormData);
    });
    console.log('Fetched notes:', notas);
    return notas;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw new Error('Erro ao carregar notas.');
  }
};

// Adicionar uma nova nota
export const addNota = async (
  data: NotaFormData
): Promise<{ id: string } | { exists: true }> => {
  try {
    console.log('Adding new note:', data);
    const docRef = await addDoc(notasCollection, data);
    console.log('Note added successfully with ID:', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error adding note:', error);
    throw new Error('Erro ao cadastrar nota.');
  }
};
