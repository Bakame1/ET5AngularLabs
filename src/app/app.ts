import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MenuComponent } from './menu/menu';
import { ProductCardComponent } from './product/product-card/product-card';
import { ProductComponent } from './product/product';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.token';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, ProductCardComponent, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private catalogService = inject(CatalogService);
  private basketService = inject(BasketService);

  title = inject(APP_TITLE);

  products = this.catalogService.products;
  total = this.basketService.total;
  hasProductsInStock = this.catalogService.hasProductsInStock;

  constructor() {
    // Initialisation des données via HTTP
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }

  addToBasket(product: ProductComponent) {
    // On appelle l'API pour ajouter au panier
    this.basketService.addItem(product.id).subscribe(() => {
        // En cas de succès, on décrémente le stock localement pour l'affichage
        this.catalogService.decreaseStock(product.id);
    });
  }
}
