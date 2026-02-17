import { ApplicationConfig, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { APP_TITLE } from './app.token';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
// Import du HttpClient
import { provideHttpClient, withFetch } from '@angular/common/http';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: APP_TITLE, useValue: 'Bienvenue sur Zenika Ecommerce' },
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    // Ajout du fournisseur HTTP
    provideHttpClient(withFetch())
  ]
};
