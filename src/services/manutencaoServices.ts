import axios from 'axios';
import { ManutencaoFormData } from '@/models/Manutencao';

const API_URL = 'http://localhost:3001/manutencao';

export const addManutencao = async (data: ManutencaoFormData) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error: any) {
    throw new Error('Erro ao adicionar manutenção: ' + error.message);
  }
};

export const fetchAllManutencoes = async (): Promise<{ docs: ManutencaoFormData[] }> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    throw new Error('Erro ao buscar manutenções: ' + error.message);
  }
};
