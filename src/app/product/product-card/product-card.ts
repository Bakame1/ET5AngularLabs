import { Component, input, output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  // Entrée requise : le produit à afficher
  product = input.required<Product>();

  // Sortie : événement quand on clique sur le bouton
  addToBasket = output<Product>();
}

