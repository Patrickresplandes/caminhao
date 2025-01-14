"use client"
import React, { useState } from 'react';
import NotaForm from '../../components/NotaForm';
import NotaTable from '../../components/NotaTable';
import { useNotas } from '../../hooks/useNotas';
import { NotaFormData } from '../../models/Nota';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNota } from '@/services/notasServices';

const CadastroNota: React.FC = () => {
  const { notas, loading, error } = useNotas();

  const handleSubmit = async (data: NotaFormData) => {
    try {
      console.log('Data being submitted:', data);
      const result = await addNota(data);
  
      if ('exists' in result && result.exists) {
        toast.error('Nota já cadastrada.');
      } else {
        toast.success('Nota cadastrada com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao cadastrar nota.');
    }
  };
  

  return (
    <>
       <title>Cadastro-Nota</title>
      <section className="bg-slate-100 text-gray-900 flex flex-col flex-1">
        <div className="h-[50px] bg-white p-2 shadow-md">
          <h1 className="text-2xl font-bold text-center">Cadastro de Nota</h1>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <NotaForm onSubmit={handleSubmit} />
          <div className="mt-8">
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <NotaTable notas={notas} />}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default CadastroNota;
