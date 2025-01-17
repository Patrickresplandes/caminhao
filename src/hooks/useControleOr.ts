import { useState, useEffect } from 'react';
import { ControleOrData } from '@/models/ControleOr';
import { fetchAllControleOr } from '@/services/controleOR';

interface UseControleORResult {
  controleOrData: ControleOrData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useControleOR = (): UseControleORResult => {
  const [controleOrData, setControleOrData] = useState<ControleOrData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchControleOrData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAllControleOr();
      setControleOrData(result.docs);
    } catch (err: any) {
      setError('Erro ao carregar os dados do controle de OR.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchControleOrData();
  }, []);

  return {
    controleOrData,
    loading,
    error,
    refetch: fetchControleOrData,
  };
};
