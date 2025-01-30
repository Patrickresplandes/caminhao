import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import jsPDF from "jspdf";
import  autoTable from  "jspdf-autotable";
import { NotaFormData } from "../models/Nota";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../fireBase/index";

const notasCollection = collection(db, "notas");

const fetchNotasByDate = async (inicio: string, fim: string): Promise<NotaFormData[]> => {
  try {
    console.log("Buscando notas por período...");
    const q = query(notasCollection, where("inicioJornada", ">=", inicio), where("fimJornada", "<=", fim));
    const querySnapshot = await getDocs(q);
    const notas: NotaFormData[] = [];
    querySnapshot.forEach((doc) => {
      notas.push({ id: doc.id, ...doc.data() } as unknown as NotaFormData);
    });
    console.log("Notas filtradas:", notas);
    return notas;
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    throw new Error("Erro ao carregar notas.");
  }
};

const NotaForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<NotaFormData>();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inicioFiltro, setInicioFiltro] = useState("");
  const [fimFiltro, setFimFiltro] = useState("");
  const [notasFiltradas, setNotasFiltradas] = useState<NotaFormData[]>([]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleFiltrar = async () => {
    if (!inicioFiltro || !fimFiltro) return alert("Selecione as datas!");
    const dados = await fetchNotasByDate(inicioFiltro, fimFiltro);
    setNotasFiltradas(dados);
  };

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Viagens", 20, 10);

    const tableColumn = ["Motorista", "Início", "Fim", "Fazenda", "Placa", "Km Início", "Km Fim", "Abastecimento"];
    const tableRows = notasFiltradas.map((nota) => [
      nota.motorista,
      nota.inicioJornada,
      nota.fimJornada,
      nota.fazenda,
      nota.placa,
      nota.kmInicio,
      nota.kmFim,
      nota.abastecimento,
    ]);

    autoTable(doc,{
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("relatorio_viagens.pdf");
  };

  return (
    <div>
      {/* Botão para abrir formulário */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={toggleFormVisibility}
          className="flex justify-center w-40 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800"
        >
          {isFormVisible ? "Cancelar" : "Cadastrar Nota"}
        </button>
      </div>
{/* Filtros de Data */}
<div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <input
            type="date"
            value={inicioFiltro}
            onChange={(e) => setInicioFiltro(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={fimFiltro}
            onChange={(e) => setFimFiltro(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleFiltrar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </div>
        <button
          onClick={gerarPDF}
          disabled={notasFiltradas.length === 0}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
        >
          Baixar PDF
        </button>
      </div>
      {/* Formulário */}
      {isFormVisible && (
        <form  className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-left">
              <label htmlFor="motorista" className="block text-sm font-medium">Motorista</label>
              <Controller
                name="motorista"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="motorista"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
              />
              {errors.motorista && <p className="text-red-600 text-sm">{errors.motorista.message}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="inicioJornada" className="block text-sm font-medium">Início da Jornada</label>
              <Controller
                name="inicioJornada"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    id="inicioJornada"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
              />
              {errors.inicioJornada && <p className="text-red-600 text-sm">{errors.inicioJornada.message}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="fazenda" className="block text-sm font-medium">Fazenda</label>
              <Controller
                name="fazenda"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="fazenda"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
              />
              {errors.fazenda && <p className="text-red-600 text-sm">{errors.fazenda.message}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="fimJornada" className="block text-sm font-medium">Fim da Jornada</label>
              <Controller
                name="fimJornada"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    id="fimJornada"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
              />
              {errors.fimJornada && <p className="text-red-600 text-sm">{errors.fimJornada.message}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="placa" className="block text-sm font-medium">Placa</label>
              <Controller
                name="placa"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="placa"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
              />
              {errors.placa && <p className="text-red-600 text-sm">{errors.placa.message}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="kmInicio" className="block text-sm font-medium">Km Início</label>
              <Controller
                name="kmInicio"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="kmInicio"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
              />
              {errors.kmInicio && <p className="text-red-600 text-sm">{errors.kmInicio.message}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="kmFim" className="block text-sm font-medium">Km Fim</label>
              <Controller
                name="kmFim"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="kmFim"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
              />
              {errors.kmFim && <p className="text-red-600 text-sm">{errors.kmFim.message}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="abastecimento" className="block text-sm font-medium">Abastecimento</label>
              <Controller
                name="abastecimento"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="abastecimento"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
              />
              {errors.abastecimento && <p className="text-red-600 text-sm">{errors.abastecimento.message}</p>}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex justify-center w-24 py-2 px-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800"
            >
              Cadastrar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NotaForm;
