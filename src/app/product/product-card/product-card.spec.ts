import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card';
import { By } from '@angular/platform-browser';
import { ProductComponent } from '../product';
import { vi } from 'vitest';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  // Un faux produit pour le test
    const mockProduct: ProductComponent = {
      id: 'test-id',
      title: 'Test Product',
      description: 'Description test',
      photo: 'photo.jpg',
      price: 100,
      stock: 10
    };
  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ProductCardComponent]
      })
      .compileComponents();

      fixture = TestBed.createComponent(ProductCardComponent);
      component = fixture.componentInstance;

      // IMPORTANT : Comme 'product' est un input.required(), il faut le définir avant le premier detectChanges()
      fixture.componentRef.setInput('product', mockProduct);

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display the product title and price', () => {
        const title = fixture.debugElement.query(By.css('.card-title')).nativeElement.textContent;
        const text = fixture.debugElement.query(By.css('.card-text')).nativeElement.textContent;

        expect(title).toContain('Test Product');
        expect(text).toContain('100 €');
    });

    it('should display the product description', () => {
        // La description se trouve généralement dans la balise <small>
        const description = fixture.debugElement.query(By.css('small')).nativeElement.textContent;
        expect(description).toContain('Description test');
      });

    it('should display the product photo as image url', () => {
        const img = fixture.debugElement.query(By.css('img')).nativeElement;
        // On vérifie que la source de l'image contient bien le nom du fichier photo
        expect(img.src).toContain('photo.jpg');
        // Bonne pratique : vérifier aussi le texte alternatif (alt)
        expect(img.alt).toContain('Test Product');
    });


    it('should emit addToBasket event when button is clicked', () => {
      // On espionne (spy) la méthode "emit" de l'output
      const spy = vi.spyOn(component.addToBasket, 'emit');

      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledWith(mockProduct);
    });

  //TESTS NGCLASS
  // Pas de classe spéciale si stock > 1
    it('should not add the "text-bg-warning" className when stock is greater than 1', () => {
      // On met le stock à 2
      component.product().stock = 2;

      // avec les Signaux :
      fixture.componentRef.setInput('product', { ...mockProduct, stock: 2 });
      fixture.detectChanges();

      const cardElement = fixture.debugElement.query(By.css('.card'));
      // On vérifie que la classe n'est PAS présente
      expect(cardElement.classes['text-bg-warning']).toBeFalsy();
    });

    // Test 2 : Classe présente si stock === 1
    it('should add the "text-bg-warning" className when stock is equal to 1', () => {
      // On met le stock à 1
      fixture.componentRef.setInput('product', { ...mockProduct, stock: 1 });
      fixture.detectChanges();

      const cardElement = fixture.debugElement.query(By.css('.card'));
      // On vérifie que la classe EST présente
      expect(cardElement.classes['text-bg-warning']).toBeTruthy();
    });
});
