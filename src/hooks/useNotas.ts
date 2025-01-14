import { NotaFormData } from '@/models/Nota';
import { db } from '@/fireBase';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

export const useNotas = () => {
  const [notas, setNotas] = useState<NotaFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notas"));
        const notasList: NotaFormData[] = [];
        querySnapshot.forEach((doc) => {
          notasList.push({ id: doc.id, ...doc.data() } as unknown as NotaFormData);
        });
        setNotas(notasList);
      } catch (error) {
        setError('Erro ao carregar notas.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotas();
  }, []);

  return { notas, loading, error };
};
