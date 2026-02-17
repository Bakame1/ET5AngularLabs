import { Component, input, output } from '@angular/core';
import { ProductComponent } from '../product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  // Entrée requise : le produit à afficher
  product = input.required<ProductComponent>();

  // Sortie : événement quand on clique sur le bouton
  addToBasket = output<ProductComponent>();
}

