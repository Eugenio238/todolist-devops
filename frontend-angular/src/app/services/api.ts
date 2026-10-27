import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(`${this.apiUrl}${url}`);
  }

  post<T>(url: string, data: unknown) {
    return this.http.post<T>(`${this.apiUrl}${url}`, data);
  }

  put<T>(url: string, data: unknown) {
    return this.http.put<T>(`${this.apiUrl}${url}`, data);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.apiUrl}${url}`);
  }
}

// Nous avons @Injectable dans notre fichier donc on peut injecter notre fichier quelque part d'autres
// Je pense que ici c'est comment on construit nos requetes sans etre obligé de mettre à chaque fois le https et autres
//je pense que ce sons des génériques qu'on utilises en Typescript avec T le type et sa retourne la construction de la requete
