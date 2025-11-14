import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoDetalhes } from '../../services/pedido-service/pedido.types';

@Component({
  selector: 'app-pedido-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-detalhes.component.html',
  styleUrl: './pedido-detalhes.component.css'
})
export class PedidoDetalhesComponent {
  @Input() pedido: PedidoDetalhes | null = null;
  @Input() isLoading = false;

  @Output() marcarPronto = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() adicionarItens = new EventEmitter<void>();
  @Output() removerItem = new EventEmitter<string>();
  @Output() fecharPedido = new EventEmitter<void>();

  onMarcarPronto(): void {
    this.marcarPronto.emit();
  }

  onFecharPedido(): void {
    this.fecharPedido.emit();
  }

  onCancelar(): void {
    this.cancelar.emit();
  }

  onAdicionarItens(): void {
    this.adicionarItens.emit();
  }

  onRemoverItem(itemId: string): void {
    this.removerItem.emit(itemId);
  }

  calcularTotal(): number {
    if (!this.pedido || !this.pedido.itens) {
      return 0;
    }
    return this.pedido.itens.reduce((total, item) => {
      return total + (item.quantidade * item.precoUnitario);
    }, 0);
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

  isPedidoFechado(): boolean {
    if (!this.pedido) return false;
    const status = this.pedido.status.toLowerCase();
    return status === 'fechado' || status === 'closed';
  }
}
