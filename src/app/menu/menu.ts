import { Component } from '@angular/core';
//to add number of items in basket we need to
import { App } from '../app';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {
  title = 'Hello menu';
}
