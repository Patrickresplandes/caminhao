import { db } from '@/fireBase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { MotoristaFormData } from '../models/Motorista';

const motoristasCollection = collection(db, 'motoristas');

// Buscar todos os motoristas
export const fetchMotoristas = async () => {
  try {
    const querySnapshot = await getDocs(motoristasCollection);
    const motoristas: MotoristaFormData[] = [];
    querySnapshot.forEach((doc) => {
      motoristas.push({ id: doc.id, ...doc.data() } as unknown as MotoristaFormData);
    });
    return motoristas;
  } catch (error) {
    throw new Error('Erro ao carregar motoristas.');
  }
};

// Buscar motorista por CPF
export const fetchMotoristaByCpf = async (cpf: string) => {
  try {
    const q = query(motoristasCollection, where('cpf', '==', cpf));
    const querySnapshot = await getDocs(q);
    const motoristas: MotoristaFormData[] = [];
    querySnapshot.forEach((doc) => {
      motoristas.push({ id: doc.id, ...doc.data() } as unknown as MotoristaFormData);
    });
    return motoristas;
  } catch (error) {
    throw new Error('Erro ao buscar motorista.');
  }
};

// Adicionar um novo motorista
export const addMotorista = async (data: MotoristaFormData) => {
  try {
    // Verifica se o CPF já está cadastrado
    const existingMotoristas = await fetchMotoristaByCpf(data.cpf);
    if (existingMotoristas.length > 0) {
      return { exists: true }; // Retorna um aviso de que o CPF já está cadastrado
    }
    // Adiciona o novo motorista
    const docRef = await addDoc(motoristasCollection, data);
    return { id: docRef.id, ...data };
  } catch (error) {
    throw new Error('Erro ao cadastrar motorista.');
  }
};
