import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormField from './FormField';
import { MotoristaFormData } from '../models/Motorista';
import { FaPlus, FaTimes } from 'react-icons/fa';

const schema = z.object({
  cpf: z.string().length(11, { message: "CPF deve ter 11 dígitos" }),
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  dataNascimento: z.string(),
  dataAdmissao: z.string(),
  senha: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

interface MotoristaFormProps {
  onSubmit: (data: MotoristaFormData) => void;
}

const MotoristaForm: React.FC<MotoristaFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<MotoristaFormData>({
    resolver: zodResolver(schema),
  });

  const [exibirFormulario, setExibirFormulario] = useState(false);

  return (
    <div className="space-y-4">
      {/* Botão para abrir/fechar o formulário */}
      <div className="flex justify-start">
        <button
          onClick={() => setExibirFormulario(!exibirFormulario)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          {exibirFormulario ? <FaTimes /> : <FaPlus />}
          <span>{exibirFormulario ? "Fechar" : "Novo Cadastro"}</span>
        </button>
      </div>

      {/* Formulário (aparece apenas se exibirFormulario for true) */}
      {exibirFormulario && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-lg shadow">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <FormField {...field} id="nome" label="Nome" error={errors.nome?.message} />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <FormField {...field} id="cpf" label="CPF" error={errors.cpf?.message} />
                )}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <Controller
                name="dataNascimento"
                control={control}
                render={({ field }) => (
                  <FormField {...field} id="dataNascimento" label="Data de Nascimento" type="date" error={errors.dataNascimento?.message} />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="dataAdmissao"
                control={control}
                render={({ field }) => (
                  <FormField {...field} id="dataAdmissao" label="Data de Admissão" type="date" error={errors.dataAdmissao?.message} />
                )}
              />
            </div>
          </div>

          <div>
            <Controller
              name="senha"
              control={control}
              render={({ field }) => (
                <FormField {...field} id="senha" label="Senha" type="password" error={errors.senha?.message} />
              )}
            />
          </div>

          <div className='flex justify-end'>
            <button 
              type="submit" 
              className="flex justify-center mt-3 w-64 py-2 px-4 bg-green-700 text-white font-semibold rounded-lg"
            >
              Cadastrar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MotoristaForm;
