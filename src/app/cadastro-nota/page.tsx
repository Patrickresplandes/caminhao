"use client"
import React, { useState } from 'react';
import NotaForm from '../../components/NotaForm';
import NotaTable from '../../components/NotaTable';
import { useNotas } from '../../hooks/useNotas';
import { NotaFormData } from '../../models/Nota';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNota } from '@/services/notasServices';
import Sidebar from '@/components/ui/SideBar';

const CadastroNota: React.FC = () => {
  const { notas, loading, error } = useNotas();
  const [searchCpf, setSearchCpf] = useState<string>("");

  const handleSubmit = async (data: NotaFormData) => {
    try {
      const result = await addNota(data);
      if (result.exists) {
        toast.error('Nota já cadastrada.');
      } else {
        toast.success('Nota cadastrada com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao cadastrar nota.');
    }
  };

  const handleSearch = async () => {
    // Lógica de busca (pode ser adicionado conforme necessidade)
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <section className="bg-slate-100 text-gray-900 flex flex-col flex-1">
        <div className="h-[50px] bg-white p-2 shadow-md">
          <h1 className="text-2xl font-bold text-center">Cadastro de Nota</h1>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <NotaForm onSubmit={handleSubmit} />
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">Buscar Nota por CPF</h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Digite o CPF"
                value={searchCpf}
                onChange={(e) => setSearchCpf(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSearch}
                className="ml-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg"
              >
                Buscar
              </button>
            </div>
          </div>
          <div className="mt-8">
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <NotaTable notas={notas} />}
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default CadastroNota;
