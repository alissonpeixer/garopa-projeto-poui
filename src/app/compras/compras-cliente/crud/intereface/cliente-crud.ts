export interface ClienteCrudDto {
  items: ClienteCrud;
}

export class ClienteCrud {
  id: number;
  nome: string;
  cip:  string;
  tipo: string;
  url: string;
  created_at: string;

  constructor() {
    this.id = 0;
    this.cip = '',
    this.nome = '';
    this.tipo = '';
    this.url = '';
    this.created_at = '';
  }
}
