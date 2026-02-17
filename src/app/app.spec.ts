import { ComponentFixture,TestBed } from '@angular/core/testing';
import { App } from './app';
import { ProductComponent } from './product/product';

describe('App', () => {
   let component: App;
   let fixture: ComponentFixture<App>;

   beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
   });

   it('should create the app', () => {
   expect(component).toBeTruthy();
   });

   it('should update total and quantity when a product is added', () => {
       // État initial
       expect(component.total_price_in_basket).toBe(0);
       expect(component.number_of_items_in_basket).toBe(0);

       // Simulation d'ajout d'un produit à 20€
       const product1: ProductComponent = { id: '1', title: 'P1', description: 'D1', photo: '', price: 20, stock: 1 };
       component.addProductToBasket(product1);

       expect(component.total_price_in_basket).toBe(20);
       expect(component.number_of_items_in_basket).toBe(1);

       // Simulation d'ajout d'un deuxième produit à 15€
       const product2: ProductComponent = { id: '2', title: 'P2', description: 'D2', photo: '', price: 15, stock: 1 };
       component.addProductToBasket(product2);

       expect(component.total_price_in_basket).toBe(35); // 20 + 15
       expect(component.number_of_items_in_basket).toBe(2);
     });
});
