import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  fdescribe('ProductCard', () => {
   /* ... */
  });




  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard]
    })
    .compileComponents();

    fixture.componentRef.setInput('product', {
       title: 'TITLE',
       description: 'DESC',
       // ...
      });

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
