import React from 'react';
import { NotaFormData } from '../models/Nota';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';

interface NotaTableProps {
  notas: NotaFormData[];
}

const NotaTable: React.FC<NotaTableProps> = ({ notas }) => {
  return (
    <Table>
      <TableCaption>Lista de Notas Cadastradas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Motorista</TableHead>
          <TableHead>Início Jornada</TableHead>
          <TableHead>Fazenda</TableHead>
          <TableHead>Jornada Acumulada</TableHead>
          <TableHead>Fim Jornada</TableHead>
          <TableHead>Placa</TableHead>
          <TableHead>Km Início</TableHead>
          <TableHead>Km Fim</TableHead>
          <TableHead>Abastecimento</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notas.map((nota, index) => (
          <TableRow key={index}>
            <TableCell>{nota.motorista}</TableCell>
            <TableCell>{nota.inicioJornada}</TableCell>
            <TableCell>{nota.fazenda}</TableCell>
            <TableCell>{nota.jornadaAcumulada}</TableCell>
            <TableCell>{nota.fimJornada}</TableCell>
            <TableCell>{nota.placa}</TableCell>
            <TableCell>{nota.kmInicio}</TableCell>
            <TableCell>{nota.kmFim}</TableCell>
            <TableCell>{nota.abastecimento}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NotaTable;
