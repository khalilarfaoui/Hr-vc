import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OffreEmploi } from '../../models/offre-emploi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private baseUrl = 'http://localhost:8081/api/offres'; // URL de base de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les offres d'emploi
  getOffres(): Observable<OffreEmploi[]> {
    return this.http.get<OffreEmploi[]>(this.baseUrl);
  }

  getOffreFilterByCategory(id: any): Observable<OffreEmploi[]> {
    return this.http.get<OffreEmploi[]>(`${this.baseUrl}/category/${id}`);
  }

  // Créer une nouvelle offre d'emploi
  creerOffre(offre: OffreEmploi): Observable<OffreEmploi> {
    return this.http.post<OffreEmploi>(this.baseUrl, offre);
  }

  // Modifier une offre d'emploi
  modifierOffre(id: number, offre: OffreEmploi): Observable<OffreEmploi> {
    return this.http.put<OffreEmploi>(`${this.baseUrl}/${id}`, offre);
  }

  // Supprimer une offre d'emploi
  supprimerOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Rechercher des offres d'emploi par titre
  rechercherParTitre(titre: string): Observable<OffreEmploi[]> {
    return this.http.get<OffreEmploi[]>(`${this.baseUrl}/recherche`, { params: { titre } });
  }

}
