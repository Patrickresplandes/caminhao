import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { ControleOrData } from '../models/ControleOr';


interface ControleOrTableProps {
  dados: ControleOrData[];
}

const ControleOrTable: React.FC<ControleOrTableProps> = ({ dados }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Qtd Viagens</TableHead>
        <TableHead>Placa</TableHead>
        <TableHead>Data</TableHead>
        <TableHead>Fazenda</TableHead>
        <TableHead>Tempo de Fábrica</TableHead>
        <TableHead>Peso Bruto</TableHead>
        <TableHead>Peso Líquido</TableHead>
        <TableHead>Tara</TableHead>
        <TableHead>Volume (m³)</TableHead>
        <TableHead>Valor</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {dados.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.qtdViagens}</TableCell>
          <TableCell>{item.placa}</TableCell>
          <TableCell>{item.data}</TableCell>
          <TableCell>{item.fazenda}</TableCell>
          <TableCell>{item.tempoFabrica}</TableCell>
          <TableCell>{item.pesoBruto}</TableCell>
          <TableCell>{item.pesoLiquido}</TableCell>
          <TableCell>{item.tara}</TableCell>
          <TableCell>{item.volumem3}</TableCell>
          <TableCell>{`R$ ${item.valor.toFixed(2)}`}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ControleOrTable;
