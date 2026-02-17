import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductComponent } from '../product/product';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private http = inject(HttpClient);

  // Le signal est initialisé vide
  private _products = signal<ProductComponent[]>([]);

  public readonly products = this._products.asReadonly();

  public readonly hasProductsInStock = computed(() =>
    this._products().some((p) => p.stock > 0)
  );

  // Méthode pour récupérer les produits du serveur
  fetchProducts(): Observable<ProductComponent[]> {
    return this.http
      .get<ProductComponent[]>('http://localhost:8080/api/products')
      .pipe(
        // On met à jour le signal avec les données reçues
        tap((products) => this._products.set(products))
      );
  }

  decreaseStock(productId: string) {
    this._products.update((products) =>
      products.map((p) => {
        if (p.id === productId && p.stock > 0) {
          return { ...p, stock: p.stock - 1 };
        }
        return p;
      })
    );
  }
}
