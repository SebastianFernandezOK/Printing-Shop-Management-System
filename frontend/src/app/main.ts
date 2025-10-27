import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { MainLayoutComponent } from './layout/main-layout.component';

bootstrapApplication(MainLayoutComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
});
