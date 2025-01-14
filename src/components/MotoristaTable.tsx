import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { MotoristaFormData } from '../models/Motorista';
import { format } from 'date-fns';

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


const MotoristaTable: React.FC<MotoristaTableProps> = ({ motoristas }) => (
  <Table>
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
          <TableCell>{formatarTimestamp(motorista.dataAdmissao)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default MotoristaTable;
