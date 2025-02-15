"use client";
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ManutencaoFormData } from '@/models/Manutencao';
import { addManutencao, fetchAllManutencoes } from '@/services/manutencaoServices';
import ManutencaoForm from '@/components/ManutencaoForm';
import ManutencaoTable from '@/components/ManutencaoTable';

const CadastroManutencao: React.FC = () => {
  const [manutencoes, setManutencoes] = useState<ManutencaoFormData[]>([]);

  // Fetch manutenções da coleção no Firestore
  useEffect(() => {
    const fetchManutencoes = async () => {
      try {
        const result = await fetchAllManutencoes();
        setManutencoes(result.docs);
      } catch (error) {
        toast.error('Erro ao buscar manutenções.');
      }
    };
    fetchManutencoes();
  }, []);

  // Enviar dados para o Firestore
  const handleSubmit = async (data: ManutencaoFormData) => {
    try {
      await addManutencao(data);
      toast.success('Manutenção cadastrada com sucesso!');
      // Recarregar as manutenções após a inclusão
      const result = await fetchAllManutencoes();
      setManutencoes(result.docs);
    } catch (error) {
      toast.error('Erro ao cadastrar manutenção.');
    }
  };

  return (
    <>
      <title>Manutenção</title>
      <section className="bg-slate-100 text-gray-900 flex flex-col flex-1">
        <div className="h-[50px] bg-white p-2 shadow-md">
          <h1 className="text-2xl font-bold text-center">Cadastro de Manutenção</h1>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <ManutencaoForm onSubmit={handleSubmit} />
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">Manutenções Cadastradas</h2>
            <ManutencaoTable manutencoes={manutencoes} />
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default CadastroManutencao;

