import { Routes } from '@angular/router';
import { GestaoPedidosComponent } from './pages/gestao-pedidos/gestao-pedidos.component';
import { ProductListComponent } from './component/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pedidos', pathMatch: 'full' },
  { path: 'pedidos', component: GestaoPedidosComponent },
  { path: 'produtos', component: ProductListComponent },
  { path: 'dashboard', component: GestaoPedidosComponent },
  { path: 'clientes', component: GestaoPedidosComponent },
  { path: 'relatorios', component: GestaoPedidosComponent }
];
