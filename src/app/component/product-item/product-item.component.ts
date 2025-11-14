import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoExterno } from '../../services/produto-externo-service/produto-externo.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() produto!: ProdutoExterno;
  @Output() adicionarAoCarrinho = new EventEmitter<ProdutoExterno>();

  onAdicionarAoCarrinho(): void {
    this.adicionarAoCarrinho.emit(this.produto);
  }
}
