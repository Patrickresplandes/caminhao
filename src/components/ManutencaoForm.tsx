import React, { useState } from 'react';
import { ManutencaoFormData } from '@/models/Manutencao';

interface ManutencaoFormProps {
  onSubmit: (data: ManutencaoFormData) => void;
}

const ManutencaoForm: React.FC<ManutencaoFormProps> = ({ onSubmit }) => {
  const [placa, setPlaca] = useState<string>('');
  const [dataEntrada, setDataEntrada] = useState<string>('');
  const [dataSaida, setDataSaida] = useState<string>('');
  const [observacao, setObservacao] = useState<string>('');
  const [valor, setValor] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const manutencaoData: ManutencaoFormData = {
      placa,
      dataEntrada: new Date(dataEntrada),
      dataSaida:  new Date(dataSaida),
      observacao,
      valor,
    };

    onSubmit(manutencaoData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="placa" className="block text-sm font-medium text-gray-700">
          Placa
        </label>
        <input
          id="placa"
          type="text"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="dataEntrada" className="block text-sm font-medium text-gray-700">
          Data de Entrada
        </label>
        <input
          id="dataEntrada"
          type="date"
          value={dataEntrada}
          onChange={(e) => setDataEntrada(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="dataSaida" className="block text-sm font-medium text-gray-700">
          Data de Saída
        </label>
        <input
          id="dataSaida"
          type="date"
          value={dataSaida}
          onChange={(e) => setDataSaida(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="observacao" className="block text-sm font-medium text-gray-700">
          Observação
        </label>
        <textarea
          id="observacao"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
          Valor
        </label>
        <input
          id="valor"
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(parseFloat(e.target.value))}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg"
        >
          Cadastrar Manutenção
        </button>
      </div>
    </form>
  );
};

export default ManutencaoForm;
