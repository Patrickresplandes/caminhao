import { fetchMotoristas } from '@/services/motoristasServices';
import { useEffect, useState } from 'react';


export const useMotoristas = () => {
  const [motoristas, setMotoristas] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMotoristas = async () => {
      try {
        const data = await fetchMotoristas();
        setMotoristas(data);
      } catch (error) {
        setError('Erro ao carregar motoristas.');
      } finally {
        setLoading(false);
      }
    };
    loadMotoristas();
  }, []);

  return { motoristas, loading, error };
};
