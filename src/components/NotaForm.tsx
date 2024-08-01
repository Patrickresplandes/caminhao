import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NotaFormData } from '../models/Nota';

interface NotaFormProps {
  onSubmit: (data: NotaFormData) => void;
}

const NotaForm: React.FC<NotaFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<NotaFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              type="time"
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
        <label htmlFor="jornadaAcumulada" className="block text-sm font-medium">Jornada Acumulada</label>
        <Controller
          name="jornadaAcumulada"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              id="jornadaAcumulada"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          )}
        />
        {errors.jornadaAcumulada && <p className="text-red-600 text-sm">{errors.jornadaAcumulada.message}</p>}
      </div>
      <div className="text-left">
        <label htmlFor="fimJornada" className="block text-sm font-medium">Fim da Jornada</label>
        <Controller
          name="fimJornada"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="time"
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
      <button 
        type="submit" 
        className="w-full py-2 px-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default NotaForm;
