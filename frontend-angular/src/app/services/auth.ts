import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from './api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  user = signal<User | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private api: Api,
    private router: Router
  ) {}

  register(
    name: string,
    email: string,
    password: string
  )
  {
    this.isLoading.set(true);
    this.error.set(null);

    this.api
      .post<AuthResponse>('/register', {
        name,
        email,
        password,
      })
      .subscribe({
        next: (response) => {
          this.saveSession(response);
          this.router.navigate(['/dashboard']);
        },

        error: (error) => {
          this.error.set(
            error.error?.message ||
              'Une erreur est survenue lors de l’inscription.'
          );

          this.isLoading.set(false);
        },

        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  login(
    email: string,
    password: string
  ) {
    this.isLoading.set(true);
    this.error.set(null);

    this.api
      .post<AuthResponse>('/login', {
        email,
        password,
      })
      .subscribe({
        next: (response) => {
          this.saveSession(response);
          this.router.navigate(['/dashboard']);
        },

        error: (error) => {
          this.error.set(
            error.error?.message ||
              'Email ou mot de passe incorrect.'
          );

          this.isLoading.set(false);
        },

        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  logout() {
    this.api.post('/logout', {}).subscribe({
      next: () => {
        this.clearSession();
      },

      error: () => {
        // Même si l'API retourne une erreur,
        // on supprime quand même la session locale.
        this.clearSession();
      },
    });
  }

  loadUser() {
    const user = localStorage.getItem('user');

    if (user) {
      this.user.set(JSON.parse(user));
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private saveSession(response: AuthResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    this.user.set(response.user);
  }

  private clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.user.set(null);

    this.router.navigate(['/login']);
  }
}


// Les données de notre formulaire login arrivent dans notre fonction login
// Nous avons la réactivité en Angular dont la correspondance c'est les signals
// dans notre login nous avons isLoading a false donc quand les données sont recues dont l'utilisateur a cliqué sur le bouton
// donc this.isLoading.set(true); on sait que pour mettre à jour les signal on utilise this.name.set ou this.name.update
// this.error.set(null); on efface une éventuelle erreur
// Nous allons l'utilisation de this.api donc dans notre constructeur nous avons private api: Api, donc injection de dépendance
// private car on peut pas l'utiliser partoutts (voir fichier)
// Donc notre service api injecté proviens de services/api.ts(c'est làbas on construit les requetes POST,GET,PUT,DELETE)
//Donc this.api nous permet d'avoir une partie de la requete
// Dans api.ts post<T>(url: string, data: unknown) {return this.http.post<T>(`${this.apiUrl}${url}`,data);}
//donc lorqu'on fait this.api.post('/login', {email,password,})
//on demande de faire une requete vers /login avec ses données
// HttpsClient est utilisé pour remplacer Axios ici dans api.ts
// this.api.post<AuthResponse>(...) c'est pour dire que la réponse attendu doit respecter cette structure
// A quoi sert .subscribe ?? Le HttpClient retourne un observable
//Un observable est un objet qui va nous permettre de gérer les données (résultats) de la requete qui peuvent ne pas venir automatiquement mais plus tard
// La différence entre un observable et une promesse c'est que l'observable peut recevoir plusieurs fois des données alors qu'une promesse ne reçoit qu'une seule fois des données
// next signifie « Si la requête réussit et qu'une réponse arrive, fais ceci. »
// response contiens la réponse Laravel
