import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoResumo } from '../../services/pedido-service/pedido.types';

@Component({
  selector: 'app-pedido-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-lista.component.html',
  styleUrl: './pedido-lista.component.css'
})
export class PedidoListaComponent {
  @Input() pedidos: PedidoResumo[] = [];
  @Input() pedidoSelecionadoId: string | null = null;
  @Input() isLoading = false;
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() totalCount = 0;

  @Output() pedidoSelecionado = new EventEmitter<string>();
  @Output() paginaAnterior = new EventEmitter<void>();
  @Output() proximaPagina = new EventEmitter<void>();
  @Output() criarNovoPedido = new EventEmitter<void>();

  onSelecionarPedido(pedidoId: string): void {
    this.pedidoSelecionado.emit(pedidoId);
  }

  onCriarNovoPedido(): void {
    this.criarNovoPedido.emit();
  }

  onPaginaAnterior(): void {
    this.paginaAnterior.emit();
  }

  onProximaPagina(): void {
    this.proximaPagina.emit();
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'aberto':
      case 'open':
        return 'bg-success';
      case 'fechado':
      case 'closed':
        return 'bg-secondary';
      case 'processando':
      case 'processing':
        return 'bg-warning text-dark';
      case 'cancelado':
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-info';
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
