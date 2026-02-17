import { Component, input } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {
  quantity_in_basket = input(0);
}
