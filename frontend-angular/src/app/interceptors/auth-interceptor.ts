import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clonedRequest);
  }

  return next(req);
};


// A quoi sert mon auth-interceptor
// Après la connexion nous avons
// localStorage
//      ↓
// token
// Quand on fait ensuite une requete protégé this.http.get('/todos')
// l'intercepteur récupère :

// const token =
//   localStorage.getItem('token');

// Puis ajoute automatiquement :

// Authorization: Bearer TON_TOKEN

// grâce à :

// const clonedRequest = req.clone({
//   setHeaders: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// Donc au lieu de faire manuellement à chaque requête :

// headers: {
//   Authorization: `Bearer ${token}`
// }

// ton interceptor le fait automatiquement.
