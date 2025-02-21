import React, { useState } from "react";
import { ControleOrData } from "../models/ControleOr";
import { db } from "../fireBase/index";
import { collection, getDocs, query, where } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format, parseISO } from "date-fns"; 
import { ptBR } from "date-fns/locale"; 

interface ControleORFormProps {
  onSubmit: (data: ControleOrData) => void;
}

const ControleORForm: React.FC<ControleORFormProps> = ({ onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [qtdViagens, setQtdViagens] = useState<number>(0);
  const [placa, setPlaca] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [fazenda, setFazenda] = useState<string>("");
  const [tempoFabrica, setTempoFabrica] = useState<string>("");
  const [pesoBruto, setPesoBruto] = useState<number>(0);
  const [pesoLiquido, setPesoLiquido] = useState<number>(0);
  const [tara, setTara] = useState<number>(0);
  const [volumem3, setVolumeM3] = useState<string>("");
  const [valor, setValor] = useState<number>(0);

  const [inicioFiltro, setInicioFiltro] = useState<string>("");
  const [fimFiltro, setFimFiltro] = useState<string>("");
  const [notasFiltradas, setNotasFiltradas] = useState<ControleOrData[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataFormatada = format(parseISO(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }); // Formata a data com a localização pt-BR
    onSubmit({ qtdViagens, placa, data: dataFormatada, fazenda, tempoFabrica, pesoBruto, pesoLiquido, tara, volumem3, valor });
    setShowForm(false);
  };

  const handleFiltrar = async () => {
    try {
      let q = query(collection(db, "controleOR"));

      if (inicioFiltro && fimFiltro) {
        // Filtra registros dentro do intervalo (AND)
        q = query(q, where("data", ">=", inicioFiltro), where("data", "<=", fimFiltro));
      } else if (inicioFiltro || fimFiltro) {
        // Filtra registros com uma das datas (OR)
        q = query(q, where("data", "==", inicioFiltro || fimFiltro));
      }

      const querySnapshot = await getDocs(q);
      const registros: ControleOrData[] = [];
      querySnapshot.forEach((doc) => {
        registros.push({ id: doc.id, ...doc.data() } as ControleOrData);
      });

      setNotasFiltradas(registros);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
    }
  };

  const gerarPDF = () => {
    console.log("Notas filtradas:", notasFiltradas); // Debugging
    if (notasFiltradas.length === 0) {
      console.warn("Nenhuma nota filtrada encontrada.");
      return;
    }
  
    const doc = new jsPDF();
    doc.text("Relatório de Controle OR", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["Placa", "Data", "Fazenda", "Qtd Viagens", "Peso Bruto", "Peso Líquido", "Tara", "Valor"]],
      body: notasFiltradas.map((nota) => [
        nota.placa,
        nota.data,
        nota.fazenda,
        nota.qtdViagens,
        nota.pesoBruto,
        nota.pesoLiquido,
        nota.tara,
        nota.valor,
      ]),
    });
  
    try {
      doc.save("Relatorio_ControleOR.pdf");
      console.log("PDF gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o PDF:", error);
    }
  };
  

  return (
    <div>
      {/* Filtros de Data */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <input type="date" value={inicioFiltro} onChange={(e) => setInicioFiltro(e.target.value)} className="p-2 border rounded" />
          <input type="date" value={fimFiltro} onChange={(e) => setFimFiltro(e.target.value)} className="p-2 border rounded" />
          <button onClick={handleFiltrar} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Buscar
          </button>
        </div>
        <button onClick={gerarPDF} disabled={notasFiltradas.length === 0} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400">
          Baixar PDF
        </button>
      </div>

      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Novo Cadastro
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Qtd Viagens</label>
              <input type="number" value={qtdViagens} onChange={(e) => setQtdViagens(Number(e.target.value))} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Placa</label>
              <input type="text" value={placa} onChange={(e) => setPlaca(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data</label>
              <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fazenda</label>
              <input type="text" value={fazenda} onChange={(e) => setFazenda(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Cadastrar</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Fechar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ControleORForm;