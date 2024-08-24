import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { ManutencaoFormData } from '@/models/Manutencao';

interface ManutencaoTableProps {
  manutencoes: ManutencaoFormData[];
}

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
            <TableCell>{new Date(manutencao.dataEntrada).toLocaleDateString()}</TableCell>
            <TableCell>{manutencao.dataSaida ? new Date(manutencao.dataSaida).toLocaleDateString() : 'Em aberto'}</TableCell>
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
