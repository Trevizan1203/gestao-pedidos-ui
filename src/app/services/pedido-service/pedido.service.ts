import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  AdicionarItemCommand, 
  CriarPedidoCommand, 
  FecharPedidoCommand, 
  PagedResult, 
  PedidoDetalhes, 
  PedidoResumo 
} from './pedido.types';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:5263/api/orders';

  constructor(private http: HttpClient) { }

  public getPedidos(page = 1, pageSize = 10): Observable<PagedResult<PedidoResumo>> {
    const params = {
      pageNumber: page.toString(),
      pageSize: pageSize.toString()
    };

    return this.http.get<PagedResult<PedidoResumo>>(this.apiUrl, { params });
  }

  public getPedidoById(id: string): Observable<PedidoDetalhes> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PedidoDetalhes>(url);
  }

  public criarPedido(): Observable<PedidoResumo> {
    const command: CriarPedidoCommand = {};
    return this.http.post<PedidoResumo>(this.apiUrl, command);
  }

  public adicionarItem(pedidoId: string, command: AdicionarItemCommand): Observable<void> {
    const url = `${this.apiUrl}/${pedidoId}/items`;
    
    const body = {
      produtoId: command.produtoId,
      quantidade: command.quantidade,
      preco: command.preco
    };
    
    return this.http.post<void>(url, body);
  }

  public removerItem(pedidoId: string, itemId: string): Observable<void> {
    const url = `${this.apiUrl}/${pedidoId}/items/${itemId}`;
    return this.http.delete<void>(url);
  }

  public fecharPedido(pedidoId: string): Observable<void> {
    const command: FecharPedidoCommand = {};
    const url = `${this.apiUrl}/${pedidoId}/close`;
    return this.http.post<void>(url, command);
  }
}
