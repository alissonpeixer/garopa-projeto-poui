export interface FornecedorDto {
  items: Fornecedor;
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
