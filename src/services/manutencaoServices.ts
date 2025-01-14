import { db } from '@/fireBase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ManutencaoFormData } from '@/models/Manutencao';

// Referência para a coleção 'manutencao' no Firestore
const manutencaoCollection = collection(db, 'manutencao');

// Adicionar uma nova manutenção
export const addManutencao = async (data: ManutencaoFormData) => {
  try {
    const docRef = await addDoc(manutencaoCollection, data);
    return { id: docRef.id, ...data };
  } catch (error: any) {
    throw new Error('Erro ao adicionar manutenção: ' + error.message);
  }
};

// Buscar todas as manutenções
export const fetchAllManutencoes = async (): Promise<{ docs: ManutencaoFormData[] }> => {
  try {
    const querySnapshot = await getDocs(manutencaoCollection);
    const docs: ManutencaoFormData[] = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() } as unknown as ManutencaoFormData);
    });
    return { docs };
  } catch (error: any) {
    throw new Error('Erro ao buscar manutenções: ' + error.message);
  }
};
