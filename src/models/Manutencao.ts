export interface ManutencaoFormData {
    placa: string;
    dataEntrada: Date;
    dataSaida: Date;
    observacao: string;
    valor: number;
    docs?:ManutencaoFormData[];
  }
  