import { NotaFormData } from '../models/Nota';

export const addNota = async (nota: NotaFormData) => {
  const response = await fetch('https://api-express-mongodb-1.onrender.com/frete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nota),
  });

  const result = await response.json();
  return result;
};
