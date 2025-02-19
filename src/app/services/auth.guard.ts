import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

export const isAuthenticated = (): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isAuthenticated().pipe(
    tap((state) => {
      // Redirect user if not authenticated
      if (!state) {
        router.navigateByUrl('login');
      }
    }),
    take(1)
  );
};

// Tap dispara un efecto secundario
// take solo toma un valor del observable y luego cancela la suscripción
