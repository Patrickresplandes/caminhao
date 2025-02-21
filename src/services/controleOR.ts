import { db } from '@/fireBase';
import { ControleOrData } from '../models/ControleOr';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie'; 


const getControleOrCollection = (empresaId: string) => {
  return collection(db, `empresa/${empresaId}/controleOr`);
};

export const addControleOr = async (data: ControleOrData) => {
  try {

    const empresaId = Cookies.get('empresaId');

    if (!empresaId) {
      throw new Error('Empresa não identificada. Faça login novamente.');
    }

    const dadosComEmpresaId = { ...data, empresaId };

    
    const controleOrCollection = getControleOrCollection(empresaId);

    const docRef = await addDoc(controleOrCollection, dadosComEmpresaId);
    return { id: docRef.id, ...dadosComEmpresaId };
  } catch (error: any) {
    console.error('Erro ao adicionar registro:', error.message);
    throw new Error('Erro ao adicionar registro: ' + error.message);
  }
};

export const fetchAllControleOr = async (): Promise<{ docs: ControleOrData[] }> => {
  try {
    // Recuperar o empresaId do cookie
    const empresaId = Cookies.get('empresaId');

    if (!empresaId) {
      throw new Error('Empresa não identificada. Faça login novamente.');
    }

    // Obter a coleção controleOr correta com base no empresaId
    const controleOrCollection = getControleOrCollection(empresaId);

    // Buscar todos os documentos na coleção
    const querySnapshot = await getDocs(controleOrCollection);
    const docs: ControleOrData[] = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() } as ControleOrData);
    });

    return { docs };
  } catch (error: any) {
    console.error('Erro ao buscar registros:', error.message);
    throw new Error('Erro ao buscar registros: ' + error.message);
  }
};