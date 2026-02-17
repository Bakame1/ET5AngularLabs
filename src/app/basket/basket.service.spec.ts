import { TestBed } from '@angular/core/testing';
import { BasketService, BasketItem } from './basket.service';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the items when a product is added', () => {
    const initialItems = service.items();
    const newItem: BasketItem = {
      id: 'test',
      title: 'Test',
      price: 50
    };
    service.addItem(newItem);
    expect(service.items()).toEqual([...initialItems, newItem]);
  });

  it('should update the total when a product is added', () => {
    const initialTotal = service.total();
    const newItem: BasketItem = {
      id: 'test',
      title: 'Test',
      price: 50
    };
    service.addItem(newItem);
    expect(service.total()).toBe(initialTotal + newItem.price);
  });
});
