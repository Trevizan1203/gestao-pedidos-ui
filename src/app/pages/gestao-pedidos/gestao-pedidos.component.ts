import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido-service/pedido.service';
import { PedidoResumo, PedidoDetalhes } from '../../services/pedido-service/pedido.types';
import { PedidoListaComponent } from '../../component/pedido-lista/pedido-lista.component';
import { PedidoDetalhesComponent } from '../../component/pedido-detalhes/pedido-detalhes.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-gestao-pedidos',
  standalone: true,
  imports: [CommonModule, PedidoListaComponent, PedidoDetalhesComponent],
  templateUrl: './gestao-pedidos.component.html',
  styleUrl: './gestao-pedidos.component.css'
})
export class GestaoPedidosComponent implements OnInit {
  pedidos: PedidoResumo[] = [];
  pedidoSelecionado: PedidoDetalhes | null = null;
  isLoadingLista = false;
  isLoadingDetalhes = false;
  errorMessage: string | null = null;
  
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;

  constructor(
    private pedidoService: PedidoService,
    private toastService: ToastService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.isLoadingLista = true;
    this.errorMessage = null;
    
    this.pedidoService.getPedidos(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.pedidos = response.items;
        this.totalPages = response.totalPages;
        this.totalCount = response.totalCount;
        this.isLoadingLista = false;
        
        if (this.pedidos.length > 0 && !this.pedidoSelecionado) {
          this.selecionarPedido(this.pedidos[0].id);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
        this.errorMessage = 'Erro ao carregar pedidos. Verifique se a API está rodando.';
        this.toastService.error('Erro ao carregar pedidos. Verifique se a API está rodando.');
        this.isLoadingLista = false;
      }
    });
  }

  selecionarPedido(pedidoId: string): void {
    this.isLoadingDetalhes = true;
    this.pedidoService.getPedidoById(pedidoId).subscribe({
      next: (pedido) => {
        this.pedidoSelecionado = pedido;
        this.isLoadingDetalhes = false;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do pedido:', err);
        this.toastService.error('Erro ao carregar detalhes do pedido.');
        this.isLoadingDetalhes = false;
      }
    });
  }

  fecharPedido(): void {
    if (!this.pedidoSelecionado) return;
    
    this.pedidoService.fecharPedido(this.pedidoSelecionado.id).subscribe({
      next: () => {
        this.toastService.success('Pedido fechado com sucesso!');
        this.loadPedidos();
        this.selecionarPedido(this.pedidoSelecionado!.id);
      },
      error: (err) => {
        console.error('Erro ao fechar pedido:', err);
        this.toastService.error('Erro ao fechar pedido.');
      }
    });
  }

  cancelarPedido(): void {
    if (!this.pedidoSelecionado) return;
    this.toastService.warning('Funcionalidade de cancelamento em desenvolvimento.');
  }

  criarNovoPedido(): void {
    this.pedidoService.criarPedido().subscribe({
      next: (novoPedido) => {
        this.toastService.success('Novo pedido criado com sucesso!');
        this.loadPedidos();
        this.selecionarPedido(novoPedido.id);
      },
      error: (err) => {
        console.error('Erro ao criar pedido:', err);
        this.toastService.error('Erro ao criar novo pedido.');
      }
    });
  }

  adicionarItensAoPedido(): void {
    if (!this.pedidoSelecionado) {
      this.toastService.warning('Selecione um pedido primeiro.');
      return;
    }

    localStorage.setItem('pedidoAtualId', this.pedidoSelecionado.id);
    this.toastService.info('Redirecionando para catálogo de produtos...');
    
    setTimeout(() => {
      this.router.navigate(['/produtos']);
    }, 500);
  }

  removerItemDoPedido(itemId: string): void {
    if (!this.pedidoSelecionado) return;
    
      this.pedidoService.removerItem(this.pedidoSelecionado.id, itemId).subscribe({
        next: () => {
          this.toastService.success('Item removido com sucesso!');
          this.selecionarPedido(this.pedidoSelecionado!.id);
        },
        error: (err) => {
          console.error('Erro ao remover item:', err);
          this.toastService.error('Erro ao remover item do pedido.');
        }
      });
  }

  proximaPagina(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPedidos();
    }
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPedidos();
    }
  }
}
