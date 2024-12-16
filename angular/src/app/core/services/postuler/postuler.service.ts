import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postulation } from '../../models/postulation.model';


@Injectable({
  providedIn: 'root'
})
export class PostulerService {

  private baseUrl = 'http://localhost:8081/api/offres-to';  // L'URL de votre API

  constructor(private http: HttpClient) { }

  // Fonction pour envoyer une postulation
  postuler(offreId: number, postulation: Postulation): Observable<any> {
    console.log(postulation);

    const formData = new FormData();
    formData.append('nom', postulation.nom);
    formData.append('email', postulation.email);
    formData.append('message', postulation.message);
    formData.append('cv', postulation.cv as Blob);
    // Ajoutez l'ID de l'offre dans les données de la requête
    // formData.append('offreId', offreId.toString());

    return this.http.post(`${this.baseUrl}/${offreId}/postuler`, formData);
  }

  // Récupérer toutes les offres
  getOffres(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  downloadCv(filename: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/cv/${filename}`, { responseType: 'blob' });
  }
}
