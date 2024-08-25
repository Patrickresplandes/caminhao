"use client"
import React, { useState } from 'react';
import MotoristaForm from '../../components/MotoristaForm';
import MotoristaTable from '../../components/MotoristaTable';
import { useMotoristas } from '../../hooks/useMotoristas';
import { MotoristaFormData } from '../../models/Motorista';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '@/components/ui/SideBar';
import { addMotorista, fetchMotoristaByCpf, fetchMotoristas } from '@/services/motoristasServices';

const CadastroMotorista: React.FC = () => {
  const { motoristas, loading, error } = useMotoristas();
  const [searchCpf, setSearchCpf] = useState<string>("");
  const [searchedMotoristas, setSearchedMotoristas] = useState<MotoristaFormData[]>([]);

  const handleSubmit = async (data: MotoristaFormData) => {
    try {
      const result = await addMotorista(data);
      if (result.exists) {
        toast.error('CPF já cadastrado.');
      } else {
        toast.success('Motorista cadastrado com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao cadastrar motorista.');
    }
  };

  const handleSearch = async () => {
    try {
      const result = await fetchMotoristas();
      console.log(result)
      setSearchedMotoristas(result);
    } catch (error) {
      toast.error('Erro ao buscar motorista.');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <section className="bg-slate-100 text-gray-900 flex flex-col flex-1">
        <div className="h-[50px] bg-white p-2 shadow-md">
          <h1 className="text-2xl font-bold text-center">Cadastro de Motorista</h1>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <MotoristaForm onSubmit={handleSubmit} />
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">Buscar Motorista por CPF</h2>
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
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <MotoristaTable motoristas={searchedMotoristas.length > 0 ? searchedMotoristas : motoristas} />}
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default CadastroMotorista;
