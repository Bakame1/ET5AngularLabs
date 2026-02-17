import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu';
import { ProductCardComponent } from './product/product-card/product-card';
import { ProductComponent } from './product/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, ProductCardComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Le total du panier
    total_price_in_basket = 0;
    number_of_items_in_basket = 0;

    // La liste des données (copiée depuis products.json comme demandé)
    products: ProductComponent[] = [
      {
        id: 'coding-the-welsch',
        title: 'Coding the welsch',
        description: 'Tee-shirt col rond - Homme',
        photo: '/assets/coding-the-welsch.jpg',
        price: 20,
        stock: 2
      },
      {
        id: 'coding-the-world',
        title: 'Coding the world',
        description: 'Tee-shirt col rond - Homme',
        photo: '/assets/coding-the-world.jpg',
        price: 18,
        stock: 2
      },
      {
        id: 'duck-vador',
        title: 'Duck Vador',
        description: 'Tee-shirt col rond - Femme',
        photo: '/assets/coding-the-stars.jpg',
        price: 21,
        stock: 2
      },
      {
        id: 'coding-the-snow',
        title: 'Coding the snow',
        description: 'Tee-shirt col rond - Femme',
        photo: '/assets/coding-the-snow.jpg',
        price: 19,
        stock: 2
      }
    ];

    //Getter pour vérifier si au moins un produit a du stock
    get hasProductsInStock(): boolean {
        // .some() renvoie true si au moins un élément respecte la condition
        return this.products.some(product => product.stock > 0);
    }

    addProductToBasket(product: ProductComponent) {


      if (product.stock > 0) {
        product.stock--; // On décrémente le stock du produit

        // Mise à jour du total
        this.total_price_in_basket += product.price;
        this.number_of_items_in_basket++;
      }
    }
}
