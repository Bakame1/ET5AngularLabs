import { Injectable, signal, computed } from '@angular/core';
import { BasketItem } from './basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private _items = signal<BasketItem[]>([]);

  public readonly items = this._items.asReadonly();

  // Calcul automatique du total
  public readonly total = computed(() =>
    this._items().reduce((total, item) => total + item.price, 0)
  );

  addItem(item: BasketItem) {
    this._items.update((items) => [...items, item]);
  }
}
