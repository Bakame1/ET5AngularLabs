import { Injectable, signal, computed } from '@angular/core';
import { ProductComponent } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  // On déplace les données "en dur" ici
  private _products = signal<ProductComponent[]>([
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
  ]);

  // Exposition en lecture seule pour l'extérieur
  public readonly products = this._products.asReadonly();

  // Signal calculé pour savoir si du stock est disponible globalement
  public readonly hasProductsInStock = computed(() =>
    this._products().some((p) => p.stock > 0)
  );

  // Méthode pour décrémenter le stock d'un produit spécifique
  decreaseStock(productId: string) {
    this._products.update((products) =>
      products.map((p) => {
        if (p.id === productId && p.stock > 0) {
          // On retourne un nouvel objet avec le stock mis à jour (immutabilité)
          return { ...p, stock: p.stock - 1 };
        }
        return p;
      })
    );
  }
}
