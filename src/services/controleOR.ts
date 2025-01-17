import { db } from '@/fireBase';
import { ControleOrData } from '../models/ControleOr';
import { collection, addDoc, getDocs } from 'firebase/firestore';


const controleOrCollection = collection(db, 'controleOr');

export const addControleOr = async (data: ControleOrData) => {
  try {
    console.log('Enviando dados para Firestore:', data);
    const docRef = await addDoc(controleOrCollection, data);
    return { id: docRef.id, ...data };
  } catch (error: any) {
    console.error('Erro ao adicionar registro:', error.message);
    throw new Error('Erro ao adicionar registro: ' + error.message);
  }
};

export const fetchAllControleOr = async (): Promise<{ docs: ControleOrData[] }> => {
  try {
    const querySnapshot = await getDocs(controleOrCollection);
    const docs: ControleOrData[] = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() } as ControleOrData);
    });
    return { docs };
  } catch (error: any) {
    throw new Error('Erro ao buscar registros: ' + error.message);
  }
};
