import { TestBed } from '@angular/core/testing';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decrease the product stock', () => {
    const product = service.products()[0];
    const initialStock = product.stock;

    service.decreaseStock(product.id);

    // On récupère le produit à jour
    const updatedProduct = service.products().find(p => p.id === product.id);
    expect(updatedProduct?.stock).toBe(initialStock - 1);
  });

  it('should not decrease the product stock when stock is empty', () => {
    const product = service.products()[0];

    // 1. On vide le stock complètement (il est à 2 par défaut)
    service.decreaseStock(product.id); // Passe à 1
    service.decreaseStock(product.id); // Passe à 0

    // Vérification intermédiaire pour être sûr
    let updatedProduct = service.products().find(p => p.id === product.id);
    expect(updatedProduct?.stock).toBe(0);

    // 2. On tente de décrémenter encore une fois
    service.decreaseStock(product.id);

    // 3. Le stock doit rester à 0
    updatedProduct = service.products().find(p => p.id === product.id);
    expect(updatedProduct?.stock).toBe(0);
  });
});
