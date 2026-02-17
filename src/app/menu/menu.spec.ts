import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu';
import { By } from '@angular/platform-browser';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    await fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test pour Signal Input
  it('should display the quantity in the badge', () => {
    // On définit la valeur de l'input "quantity" à 5
    fixture.componentRef.setInput('quantity_in_basket', 5);

    // On déclenche la détection des changements pour mettre à jour le HTML
    fixture.detectChanges();

    // On récupère l'élément HTML du badge (la classe .badge)
    const badgeElement = fixture.debugElement.query(By.css('.badge'));
    const badgeText = badgeElement.nativeElement.textContent.trim();

    // On vérifie que le texte est bien "5"
    expect(badgeText).toBe('5');
  });


});
