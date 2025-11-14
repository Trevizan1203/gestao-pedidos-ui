import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProdutoExterno {
  id: number; 
  title: string;
  price: number; 
  description: string;
  category: string;
  image: string; 
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoExternoService {

  private apiUrl = 'https://fakestoreapi.com/products'; 

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<ProdutoExterno[]> {
    return this.http.get<ProdutoExterno[]>(this.apiUrl);
  }
  
  getProdutoById(id: number): Observable<ProdutoExterno> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ProdutoExterno>(url);
  }
}