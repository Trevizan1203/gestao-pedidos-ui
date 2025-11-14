import { Component, OnInit } from '@angular/core';
import { ProdutoExternoService } from '../../services/produto-externo-service/produto-externo.service';
import { ProdutoExterno } from '../../services/produto-externo-service/produto-externo.service';
import { PedidoService } from '../../services/pedido-service/pedido.service';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  produtos: ProdutoExterno[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  pedidoAtualId: string | null = null;

  constructor(
    private produtoExternoService: ProdutoExternoService,
    private pedidoService: PedidoService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pedidoAtualId = localStorage.getItem('pedidoAtualId');
    
    if (this.pedidoAtualId) {
      this.toastService.info(`Adicione produtos ao pedido #${this.pedidoAtualId.substring(0, 8)}`);
    }
    
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.produtoExternoService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.errorMessage = 'Falha ao carregar produtos do catálogo.';
        this.toastService.error('Falha ao carregar produtos do catálogo.');
        this.isLoading = false;
      }
    });
  }

  adicionarAoCarrinho(produto: ProdutoExterno): void {
    if (!this.pedidoAtualId) {
      this.toastService.warning('Nenhum pedido selecionado. Redirecionando...');
      setTimeout(() => {
        this.router.navigate(['/pedidos']);
      }, 1000);
      return;
    }

    const produtoGuid = '00000000-0000-0000-0000-' + produto.id.toString().padStart(12, '0');

    this.pedidoService.adicionarItem(this.pedidoAtualId, {
      produtoId: produtoGuid,
      quantidade: 1,
      preco: produto.price
    }).subscribe({
      next: () => {
        this.toastService.success(`${produto.title} adicionado ao pedido!`);
      },
      error: (err) => {
        console.error('Erro ao adicionar item:', err);
        this.toastService.error('Erro ao adicionar item ao pedido.');
      }
    });
  }
}
