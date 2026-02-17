import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu';
import { By } from '@angular/platform-browser';
import { BasketService } from '../basket/basket.service';
import { signal } from '@angular/core';
import { BasketItem } from '../basket/basket-item';

// Stub pour isoler le test du Menu
class BasketStubService {
  items = signal<BasketItem[]>([]);
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let basketService: BasketStubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      // On fournit le Stub à la place du vrai service
      providers: [
        { provide: BasketService, useClass: BasketStubService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;

    // On récupère l'instance du stub injecté pour pouvoir manipuler ses signaux
    basketService = TestBed.inject(BasketService) as unknown as BasketStubService;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the number of items in the badge', () => {
    // 1. On simule des items dans le panier via le service
    basketService.items.set([
      { id: '1', title: 'P1', price: 10 },
      { id: '2', title: 'P2', price: 20 },
      { id: '3', title: 'P3', price: 30 }
    ]);

    // 2. On met à jour la vue
    fixture.detectChanges();

    // 3. On vérifie le badge
    const badgeElement = fixture.debugElement.query(By.css('.badge'));
    const badgeText = badgeElement.nativeElement.textContent.trim();

    expect(badgeText).toBe('3');
  });
});
