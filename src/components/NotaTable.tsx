import React from 'react';
import { NotaFormData } from '../models/Nota';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { format } from 'date-fns';

interface NotaTableProps {
  notas: NotaFormData[];
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

const NotaTable: React.FC<NotaTableProps> = ({ notas }) => {
  return (
    <Table>
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
            <TableCell>{formatarTimestamp(nota.inicioJornada)}</TableCell>
            <TableCell>{nota.fazenda}</TableCell>
            <TableCell>{formatarTimestamp(nota.fimJornada)}</TableCell>
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
