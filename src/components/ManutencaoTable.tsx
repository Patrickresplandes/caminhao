import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { ManutencaoFormData } from '@/models/Manutencao';
import { format } from 'date-fns';

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

interface ManutencaoTableProps {
  manutencoes: ManutencaoFormData[];
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

const ManutencaoTable: React.FC<ManutencaoTableProps> = ({ manutencoes }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Placa</TableHead>
        <TableHead>Data de Entrada</TableHead>
        <TableHead>Data de Saída</TableHead>
        <TableHead>Observação</TableHead>
        <TableHead>Valor</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.isArray(manutencoes) && manutencoes.length > 0 ? (
        manutencoes.map((manutencao, index) => (
          <TableRow key={index}>
            <TableCell>{manutencao.placa}</TableCell>
            <TableCell>{formatarTimestamp(manutencao.dataEntrada)}</TableCell>
            <TableCell>
              {manutencao.dataSaida ? formatarTimestamp(manutencao.dataSaida) : 'Em aberto'}
            </TableCell>
            <TableCell>{manutencao.observacao}</TableCell>
            <TableCell>{`R$ ${manutencao.valor.toFixed(2)}`}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5}>Nenhuma manutenção encontrada.</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default ManutencaoTable;