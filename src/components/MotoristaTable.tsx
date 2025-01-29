import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { MotoristaFormData } from '../models/Motorista';
import { format } from 'date-fns';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface MotoristaTableProps {
  motoristas: MotoristaFormData[];
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

const formatarTimestamp = (data: string | Timestamp | null): string => {
  if (!data) {
    return 'Data inválida';
  }

  if (typeof data === 'object' && 'seconds' in data) {
    const date = new Date(data.seconds * 1000);
    return format(date, 'dd/MM/yyyy');
  }

  return data;
};

const MotoristaTable: React.FC<MotoristaTableProps> = ({ motoristas }) => {
  const [senhaVisivel, setSenhaVisivel] = useState<{ [key: number]: boolean }>({});

  const toggleSenhaVisibilidade = (index: number) => {
    setSenhaVisivel((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>Data de Nascimento</TableHead>
          <TableHead>Data de Admissão</TableHead>
          <TableHead>Senha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {motoristas.map((motorista, index) => (
          <TableRow key={index}>
            <TableCell>{motorista.nome}</TableCell>
            <TableCell>{motorista.cpf}</TableCell>
            <TableCell>{motorista.dataNascimento}</TableCell>
            <TableCell>{formatarTimestamp(motorista.dataAdmissao)}</TableCell>
            <TableCell className="flex items-center space-x-2">
              <span>{senhaVisivel[index] ? motorista.senha : '••••••••'}</span>
              <button onClick={() => toggleSenhaVisibilidade(index)}>
                {senhaVisivel[index] ? <FaEyeSlash /> : <FaEye />}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MotoristaTable;
