// src/hooks/useMotoristas.ts
import { MotoristaFormData } from '@/models/Motorista';
import { db } from '@/fireBase';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

export const useMotoristas = () => {
  const [motoristas, setMotoristas] = useState<MotoristaFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMotoristas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "motoristas"));
        const motoristasList: MotoristaFormData[] = [];
        querySnapshot.forEach((doc) => {
          motoristasList.push({ id: doc.id, ...doc.data() } as unknown as MotoristaFormData);
        });
        setMotoristas(motoristasList);
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
