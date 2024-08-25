import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { MotoristaFormData } from '../models/Motorista';

interface MotoristaTableProps {
  motoristas: MotoristaFormData[];
}

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
          <TableCell>{motorista.dataAdmissao}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default MotoristaTable;
