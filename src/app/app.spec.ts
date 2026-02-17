import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.token';
import { signal, computed } from '@angular/core';
import { ProductComponent } from './product/product';
import { BasketItem } from './basket/basket-item';
import { vi } from 'vitest';

// Stub pour CatalogService
class CatalogStubService {
  products = signal<ProductComponent[]>([
    { id: 'test', title: 'Test', description: '', photo: '', price: 10, stock: 1 }
  ]);
  hasProductsInStock = computed(() => true);
  decreaseStock(id: string) {}
}

// Stub pour BasketService
class BasketStubService {
  // [CORRECTION] Ajout du signal items manquant
  items = signal<BasketItem[]>([]);
  total = signal(0);
  addItem(item: BasketItem) {}
}

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let catalogService: CatalogService;
  let basketService: BasketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: CatalogService, useClass: CatalogStubService },
        { provide: BasketService, useClass: BasketStubService },
        { provide: APP_TITLE, useValue: 'Test Title' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    catalogService = TestBed.inject(CatalogService);
    basketService = TestBed.inject(BasketService);

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Test Title');
  });

  it('should call "CatalogService.decreaseStock" and "BasketService.addItem" methods when a product is added to the basket', () => {
    const spyDecrease = vi.spyOn(catalogService, 'decreaseStock');
    const spyAdd = vi.spyOn(basketService, 'addItem');

    const product = component.products()[0];

    component.addToBasket(product);

    expect(spyDecrease).toHaveBeenCalledWith(product.id);
    expect(spyAdd).toHaveBeenCalledWith({
      id: product.id,
      title: product.title,
      price: product.price
    });
  });
});
