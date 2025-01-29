import { ControleOrData } from '../models/ControleOr';
import React, { useState } from "react";

interface ControleORFormProps {
  onSubmit: (data: ControleOrData ) => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ qtdViagens, placa, data, fazenda, tempoFabrica, pesoBruto, pesoLiquido, tara, volumem3, valor });
    setShowForm(false);
  };

  return (
    <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Tempo de Fábrica</label>
              <input type="number" value={tempoFabrica} onChange={(e) => setTempoFabrica(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Peso Bruto</label>
              <input type="number" value={pesoBruto} onChange={(e) => setPesoBruto(Number(e.target.value))} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Peso Líquido</label>
              <input type="number" value={pesoLiquido} onChange={(e) => setPesoLiquido(Number(e.target.value))} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tara</label>
              <input type="number" value={tara} onChange={(e) => setTara(Number(e.target.value))} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Volume (m³)</label>
              <input type="number" value={volumem3} onChange={(e) => setVolumeM3(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valor</label>
              <input type="number" value={valor} onChange={(e) => setValor(Number(e.target.value))} className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
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