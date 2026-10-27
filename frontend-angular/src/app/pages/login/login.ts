import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(
    public auth: Auth
  ) {}

  handleSubmit() {
    if (!this.email || !this.password) {
      return;
    }

    this.auth.login(
      this.email,
      this.password
    );
  }
}


// Quand on créer un composant en Angular nous avons un fichier .ts qui contient la logique du composant,
// un fichier .html qui contient le template du composant et un fichier .css qui contient le style du composant.
// C'est dans notre fichier .ts qu'on déclare notre classe composant qui va contenir notre composant et on va utiliser le décorateur @Component pour déclarer notre composant.
// Dans notre composant classe nous avons déclaré 2 variables par défaut string vide pour permettre à notre formulaire de
// modifier ces derniers grace à ngModel qui permet de lier une variable à un champs du formulaire
// [(ngModel)]="email"
// Au départ email = "" quand l'user va taper eugenio@gmail.com la variable email est mis à jour et prend la valeur rensegnée
// Pareil pour les autres champs . Dans notre fichier .ts nous avons l'import de FormsModule qui nous permet d'utiliser ngModel car ngModel fait partie de FormsModule.
//Comment le formulaire est soumis grace à ngSubmit <form (ngSubmit)="handleSubmit()"> (exécute handleSubmit quand le bouton est soumis)
// Dans notre handleSubmit si les champs sont vides on ne retourne rien sinon on envoi les données a notre fonction login
//C'est quoi this.auth ? et à quoi sert le constructeur ?
// Un constructeur est une fonction spéciale d'une classe . Il est exécuté lorsque notre composant est créer
//Dans notre constructeur nous avons public auth: Auth , nous avons besoin de notre service donc on créer une instance de notre service
//pour pouvoir l'utiliser ici avec this.auth : c'est l'injection de dépendances
//this.auth et non auth car public auth: Auth propriété de la classe
//Comment Angular sais que notre service est injectable grace à @Injectable({  providedIn: 'root',}) qui est dans notre service
// C'est grace à notre construteur qu'on peut use auth ici et dans notre html
//public auth: Auth , on use public car celà doit etre accessible dans notre html
//Voir services/auth.ts
