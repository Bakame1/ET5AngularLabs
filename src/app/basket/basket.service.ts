import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasketItem } from './basket-item';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private http = inject(HttpClient);
  private _items = signal<BasketItem[]>([]);

  public readonly items = this._items.asReadonly();

  public readonly total = computed(() =>
    this._items().reduce((total, item) => total + item.price, 0)
  );

  // Récupérer le panier existant (GET)
  fetchBasket(): Observable<BasketItem[]> {
    return this.http
      .get<BasketItem[]>('http://localhost:8080/api/basket')
      .pipe(tap((items) => this._items.set(items)));
  }

  // Ajouter un item (POST)
  addItem(productId: string): Observable<BasketItem> {
    return this.http
      .post<BasketItem>('http://localhost:8080/api/basket', { productId })
      .pipe(
        tap((item) => {
          // On ajoute l'item retourné par le serveur à notre liste locale
          this._items.update((items) => [...items, item]);
        })
      );
  }
}
