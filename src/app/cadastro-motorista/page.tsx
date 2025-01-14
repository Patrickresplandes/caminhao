"use client";
import React, { useState, useEffect } from 'react';
import MotoristaForm from '../../components/MotoristaForm';
import MotoristaTable from '../../components/MotoristaTable';
import { MotoristaFormData } from '../../models/Motorista';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addMotorista, fetchMotoristas } from '@/services/motoristasServices';

const CadastroMotorista: React.FC = () => {
  const [motoristas, setMotoristas] = useState<MotoristaFormData[]>([]);
  const [searchedMotoristas, setSearchedMotoristas] = useState<MotoristaFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fetch motoristas do Firestore
  useEffect(() => {
    const loadMotoristas = async () => {
      setLoading(true);
      try {
        const result = await fetchMotoristas();
        setMotoristas(result);
      } catch (err) {
        setError('Erro ao carregar motoristas.');
      } finally {
        setLoading(false);
      }
    };
    loadMotoristas();
  }, []);

  // Enviar dados para o Firestore
  const handleSubmit = async (data: MotoristaFormData) => {
    try {
      const result = await addMotorista(data);
      if (result.exists) {
        toast.error('CPF já cadastrado.');
      } else {
        toast.success('Motorista cadastrado com sucesso!');
        // Recarregar os motoristas após a inclusão
        const result = await fetchMotoristas();
        setMotoristas(result);
      }
    } catch (error) {
      toast.error('Erro ao cadastrar motorista.');
    }
  };

  return (
    <>
      <title>Cadastro-Motorista</title>
      <section className="bg-slate-100 text-gray-900 flex flex-col flex-1">
        <div className="h-[50px] bg-white p-2 shadow-md">
          <h1 className="text-2xl font-bold text-center">Cadastro de Motorista</h1>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <MotoristaForm onSubmit={handleSubmit} />
          <div className="mt-8">
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <MotoristaTable motoristas={searchedMotoristas.length > 0 ? searchedMotoristas : motoristas} />}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default CadastroMotorista;
