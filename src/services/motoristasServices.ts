import { MotoristaFormData } from '../models/Motorista';

export const fetchMotoristas = async () => {
  try {
    const response = await fetch('https://api-express-mongodb-1.onrender.com/motoristas');
    const result = await response.json();
    return result.docs || [];
  } catch (error) {
    throw new Error('Erro ao carregar motoristas.');
  }
};

export const fetchMotoristaByCpf = async (cpf: string) => {
  try {
    const response = await fetch(`https://api-express-mongodb-1.onrender.com/motoristas?cpf=${cpf}`);
    const result = await response.json();
    return result.motoristas || [];
  } catch (error) {
    throw new Error('Erro ao buscar motorista.');
  }
};

export const addMotorista = async (data: MotoristaFormData) => {
  try {
    const response = await fetch('https://api-express-mongodb-1.onrender.com/motoristas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Erro ao cadastrar motorista.');
  }
};
