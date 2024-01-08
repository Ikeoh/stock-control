import { ApplicationConfig } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { CurrencyPipe } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(CurrencyPipe),
    importProvidersFrom(DialogService),
    importProvidersFrom(ConfirmationService)
  ],
};
