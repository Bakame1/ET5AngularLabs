import { Component, inject, computed } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css', // Assurez-vous que ce fichier existe, sinon supprimez la ligne
})
export class MenuComponent {
  private basketService = inject(BasketService);

  // Signal calculé pour le badge du menu
  numberOfItems = computed(() => this.basketService.items().length);
}
