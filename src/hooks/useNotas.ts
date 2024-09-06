import { useState, useEffect } from 'react';
import { NotaFormData } from '../models/Nota';

export const useNotas = () => {
  const [notas, setNotas] = useState<NotaFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch('https://api-express-mongodb-1.onrender.com/frete');
        const result = await response.json();

        if (Array.isArray(result)) {
          setNotas(result);
        } else {
          setNotas([]);
          console.warn('A resposta da API não é um array.');
        }
  
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar notas.');
        setLoading(false);
      }
    };
  
    fetchNotas();
  }, []);
  

  return { notas, loading, error };
};
