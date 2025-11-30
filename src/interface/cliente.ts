export interface ClienteDto {
  items: Cliente;
  hasNext: boolean;
}

export interface ClienteListaDto {
  items: Array<Cliente>;
  hasNext: boolean;
}


export class Cliente {
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
