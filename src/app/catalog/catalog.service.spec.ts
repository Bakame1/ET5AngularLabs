import { TestBed } from '@angular/core/testing';
import { CatalogService } from './catalog.service';
import { ProductComponent } from '../product/product';

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
    const initialStock = service.products()[0].stock;
    service.decreaseStock(service.products()[0].id);
    expect(service.products()[0].stock).toBe(initialStock - 1);
  });

  it('should not decrease the product stock when stock is empty', () => {
    const productId = service.products()[0].id;
    service.decreaseStock(productId);
    const initialStock = service.products().find(p => p.id === productId)?.stock;
    service.decreaseStock(productId);
    expect(service.products().find(p => p.id === productId)?.stock).toBe(initialStock);
  });
});
