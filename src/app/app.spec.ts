import { ComponentFixture,TestBed } from '@angular/core/testing';
import { App } from './app';
import { ProductComponent } from './product/product';
import { By } from '@angular/platform-browser';


describe('App', () => {
   let component: App;
   let fixture: ComponentFixture<App>;

   beforeEach(async () => {
    await TestBed.configureTestingModule({
          // L'approche "Implicit dependency import" :
          // Comme App est standalone et importe déjà ProductCardComponent et MenuComponent,
          // il suffit d'importer App ici. TestBed résout tout seul les dépendances.
          imports: [App],
        }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
   });

   it('should create the app', () => {
   expect(component).toBeTruthy();
   });

   // Test d'affichage : Il doit afficher les produits
     it('should display the products', () => {
       // On compte le nombre de balises <app-product-card> dans le DOM
       const productElements = fixture.debugElement.queryAll(By.css('app-product-card'));

       // On vérifie que cela correspond à la longueur de notre liste de produits (4)
       expect(productElements.length).toBe(component.products.length);
     });

     // Test de classe : Mise à jour du total via la méthode
     it('should update the total when "addProductToBasket" class method is called', () => {
       // État initial
       expect(component.total_price_in_basket).toBe(0);

       // On crée un faux produit
       const mockProduct: ProductComponent = {
         id: 'test', title: 'Test', description: '', photo: '', price: 50, stock: 1
       };

       // ACTION : On appelle la méthode TypeScript directement
       component.addProductToBasket(mockProduct);

       // VÉRIFICATION : La variable a changé
       expect(component.total_price_in_basket).toBe(50);
     });

     it('should update the stock of the product added to the basket ', () => {
            // État initial
            expect(component.total_price_in_basket).toBe(0);

            // On crée un faux produit
            const mockProduct: ProductComponent = {
              id: 'test', title: 'Test', description: '', photo: '', price: 50, stock: 1
            };

            // ACTION : On appelle la méthode TypeScript directement
            component.addProductToBasket(mockProduct);

            // VERIF DU STOCK : Le stock du produit doit être décrémenté
            expect(mockProduct.stock).toBe(0);
          });

       it('stock of the product should not be negative ', () => {
         // État initial
         expect(component.total_price_in_basket).toBe(0);

         // On crée un faux produit
         const mockProduct: ProductComponent = {
           id: 'test', title: 'Test', description: '', photo: '', price: 50, stock: 0
         };

         // ACTION : On appelle la méthode TypeScript directement
         component.addProductToBasket(mockProduct);

         // VERIF DU STOCK : Le stock du produit doit être décrémenté
         expect(mockProduct.stock).toBe(0);
       });

});
