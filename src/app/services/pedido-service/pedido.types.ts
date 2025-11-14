export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PedidoResumo {
  id: string;
  status: string;
  dataCriacao: string; 
}

export interface ItemPedidoDetalhes {
  itemId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

export interface PedidoDetalhes {
  id: string;
  status: string;
  dataCriacao: string;
  itens: ItemPedidoDetalhes[];
}

export interface AdicionarItemCommand {
  produtoId: string;
  quantidade: number;
  preco: number;
}

export interface CriarPedidoCommand {
}

export interface FecharPedidoCommand {
}

export interface RemoverItemCommand {
}

export interface NovoItem {
  produtoId: string;
  quantidade: number;
  preco: number;
}
