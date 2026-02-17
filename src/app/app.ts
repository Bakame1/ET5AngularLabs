import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuComponent } from './menu/menu';
import { ProductCard } from './product/product-card/product-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Hello, ET5AngularLabs';
}
