"use client";

import React from "react";
import ControleORForm from "../../components/ControleORForm";
import ControleORTable from "../../components/ControleORTable";
import { useControleOR } from "../../hooks/useControleOr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addControleOr } from "@/services/controleOR";
import { ControleOrData } from "@/models/ControleOr";


const ControleOR: React.FC = () => {
  const { controleOrData, loading, error } = useControleOR();

  
  const handleSubmit = async (data: ControleOrData) => {
    try {
      await addControleOr(data);
      toast.success("Registro cadastrado com sucesso!");
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        toast.error("Registro já cadastrado.");
      } else {
        toast.error("Erro ao cadastrar registro.");
      }
    }
  };
  
  return (
    <>
      <title>Controle de OR</title>
      <section className="bg-slate-100 text-gray-900 flex flex-col flex-1">
        <div className="h-[50px] bg-white p-2 shadow-md">
          <h1 className="text-2xl font-bold text-center">Controle de OR</h1>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <ControleORForm onSubmit={handleSubmit} />
          <div className="mt-8">
            {loading ? (
              <p>Carregando...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ControleORTable dados={controleOrData} />
            )}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ControleOR;
