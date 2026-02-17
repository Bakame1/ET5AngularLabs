import { Component, inject } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { ProductCardComponent } from './product/product-card/product-card';
import { ProductComponent } from './product/product';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.token';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, ProductCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private catalogService = inject(CatalogService);
  private basketService = inject(BasketService);

  // Injection du titre via le Token
  title = inject(APP_TITLE);

  // On expose les signaux des services pour le template
  products = this.catalogService.products;
  // Note: Si votre template utilise 'total_price_in_basket', changez-le pour utiliser basketService.total()

  // Cette méthode est appelée par l'événement (output) du composant product-card
  addToBasket(product: ProductComponent) {
    // 1. On décrémente le stock via le CatalogService
    this.catalogService.decreaseStock(product.id);

    // 2. On ajoute l'item via le BasketService
    this.basketService.addItem({
      id: product.id,
      title: product.title,
      price: product.price
    });
  }
}
