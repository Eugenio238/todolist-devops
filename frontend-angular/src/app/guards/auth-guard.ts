import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router,
} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token =
    localStorage.getItem('token');

  const router = inject(Router);

  if (token) {
    return true;
  }

  return router.createUrlTree([
    '/login',
  ]);
};



//Mon authguard va me servir à Empêcher quelqu'un d'accéder au Dashboard s'il n'est pas connecté.
// Dans les routes nous avons {path: 'dashboard', component: Dashboard, canActivate: [authGuard] }
//Donc lorsqu'on demande /dashboard Angular vérifie
//Puis-je accéder à Dashboard ?
//          ↓
//       authGuard
//          ↓
//    token existe ?
//       ↙       ↘
//     OUI       NON
//      ↓         ↓
//    true     /login
