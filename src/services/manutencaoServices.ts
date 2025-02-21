import { db } from '@/fireBase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ManutencaoFormData } from '@/models/Manutencao';
import Cookies from 'js-cookie'; 

const getManutencaoCollection = (empresaId: string) => {
  return collection(db, `empresa/${empresaId}/manutencao`);
};


export const addManutencao = async (data: ManutencaoFormData) => {
  try {
    console.log('Enviando dados para Firestore:', data);

    const empresaId = Cookies.get('empresaId');

    if (!empresaId) {
      throw new Error('Empresa não identificada. Faça login novamente.');
    }

    const dadosComEmpresaId = { ...data, empresaId };

    const manutencaoCollection = getManutencaoCollection(empresaId);

    const docRef = await addDoc(manutencaoCollection, dadosComEmpresaId);
    return { id: docRef.id, ...dadosComEmpresaId };
  } catch (error: any) {
    console.error('Erro ao adicionar manutenção:', error.message);
    throw new Error('Erro ao adicionar manutenção: ' + error.message);
  }
};


export const fetchAllManutencoes = async (): Promise<{ docs: ManutencaoFormData[] }> => {
  try {

    const empresaId = Cookies.get('empresaId');

    if (!empresaId) {
      throw new Error('Empresa não identificada. Faça login novamente.');
    }


    const manutencaoCollection = getManutencaoCollection(empresaId);

    const querySnapshot = await getDocs(manutencaoCollection);
    const docs: ManutencaoFormData[] = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() } as unknown as ManutencaoFormData);
    });

    return { docs };
  } catch (error: any) {
    console.error('Erro ao buscar manutenções:', error.message);
    throw new Error('Erro ao buscar manutenções: ' + error.message);
  }
};