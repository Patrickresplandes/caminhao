"use client";

import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Sidebar from '@/components/ui/SideBar';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

const schema = z.object({
  cpf: z.string().length(11, { message: "CPF deve ter 11 dígitos" }),
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  dataNascimento: z.string(),
  dataAdmissao: z.string(),
});

type FormData = z.infer<typeof schema>;

const CadastroMotorista = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [motoristas, setMotoristas] = useState<FormData[]>([]);
  const [searchCpf, setSearchCpf] = useState<string>("");

  useEffect(() => {
    const fetchMotoristas = async () => {
        try {
          const response = await fetch('https://api-express-mongodb-1.onrender.com/motoristas');
          const result = await response.json();
          setMotoristas(result.motoristas || []); 
        } catch (error) {
          toast.error('Erro ao carregar motoristas.');
        }
      };

      fetchMotoristas();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('https://api-express-mongodb-1.onrender.com/motoristas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (result.exists) {
        toast.error('CPF já cadastrado.');
        return;
      }
  
      toast.success('Motorista cadastrado com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Erro ao cadastrar motorista. Por favor, tente novamente.');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api-express-mongodb-1.onrender.com/motoristas?cpf=${searchCpf}`);
      const data = await response.json();
      setMotoristas(data);
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="nome" className="block text-sm font-medium">Nome</label>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="nome"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.nome && <p className="text-red-600 text-sm">{errors.nome.message}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="cpf" className="block text-sm font-medium">CPF</label>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="cpf"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.cpf && <p className="text-red-600 text-sm">{errors.cpf.message}</p>}
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="dataNascimento" className="block text-sm font-medium">Data de Nascimento</label>
                <Controller
                  name="dataNascimento"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      id="dataNascimento"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.dataNascimento && <p className="text-red-600 text-sm">{errors.dataNascimento.message}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="dataAdmissao" className="block text-sm font-medium">Data de Admissão</label>
                <Controller
                  name="dataAdmissao"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      id="dataAdmissao"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                />
                {errors.dataAdmissao && <p className="text-red-600 text-sm">{errors.dataAdmissao.message}</p>}
              </div>
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
            <Table>
              <TableCaption>Lista de Motoristas Cadastrados</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Data de Nascimento</TableHead>
                  <TableHead>Data de Admissão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {motoristas.map((motorista, index) => (
                  <TableRow key={index}>
                    <TableCell>{motorista.nome}</TableCell>
                    <TableCell>{motorista.cpf}</TableCell>
                    <TableCell>{motorista.dataNascimento}</TableCell>
                    <TableCell>{motorista.dataAdmissao}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default CadastroMotorista;
