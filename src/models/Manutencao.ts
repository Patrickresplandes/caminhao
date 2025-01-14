export interface ManutencaoFormData {
    placa: string;
    dataEntrada: string;
    dataSaida: string;
    observacao: string;
    valor: number;
    docs?:ManutencaoFormData[];
  }
  