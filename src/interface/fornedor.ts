export interface FornecedorDto {
  items: Fornecedor;
}

export interface FornecedorListaDto {
  items: Array<Fornecedor>;
  hasNext: boolean;
}


export class Fornecedor {
  id: number;
  nome: string;
  cip:  string;
  url: string;
  created_at: string;

  constructor() {
    this.id = 0;
    this.cip = '',
    this.nome = '';
    this.url = '';
    this.created_at = '';
  }
}
