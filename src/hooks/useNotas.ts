import { useState, useEffect } from 'react';
import { NotaFormData } from '../models/Nota';

export const useNotas = () => {
  const [notas, setNotas] = useState<NotaFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch('https://api-express-mongodb-1.onrender.com/notas');
        const result = await response.json();
        setNotas(result.notas || []);
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
