import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { APP_TITLE } from './app.token'; // Import du token

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Injection de la valeur du titre
    { provide: APP_TITLE, useValue: 'Bienvenue sur Zenika Ecommerce' }
  ]
};
