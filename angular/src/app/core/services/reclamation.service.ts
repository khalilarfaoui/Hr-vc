import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reclamation {
  id?: number;
  name: string;
  message: string;
  localDateTime?: string;
  status : Status
  text : any
}

enum Status {
  PENDING = 'PENDING', // En attente
  IN_PROGRESS = 'IN_PROGRESS', // En cours de traitement
  RESOLVED = 'RESOLVED', // Résolu
  REJECTED = 'REJECTED' // Rejeté
}

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8081/api/reclamations'; // Remplacez par l'URL réelle de votre backend

  constructor(private http: HttpClient) {}

  // Créer une réclamation
  createReclamation(reclamation: Reclamation): Observable<Reclamation> {
    const id = localStorage.getItem("id")
    return this.http.post<Reclamation>(this.apiUrl + "/" + id, reclamation);
  }

  // Récupérer toutes les réclamations
  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl);
  }

  sendEmail(data:any): Observable<void> {
    return this.http.post<void>(this.apiUrl+"/send-email/response" , data);
  }

  // Récupérer une réclamation par ID
  getReclamationById(): Observable<Reclamation> {
    const id = localStorage.getItem("id")
    return this.http.get<Reclamation>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une réclamation
  updateReclamation(id: number, reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/${id}`, reclamation);
  }
  updateSimpleReclamation(id: number, reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/simple-edit/${id}`, reclamation);
  }

  // Supprimer une réclamation
  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public message = {
    create: "Reclamation created successfully.",
    update: "Reclamation updated successfully.",
    delete: "Reclamation deleted successfully."
  };
}
