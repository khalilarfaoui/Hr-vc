import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://localhost:8081/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getNbArticleByCategory(){
    return this.http.get('http://localhost:8081/categories/article/counts')
  }


  public message = {
    create : "Catégorie crée avec succès." ,
    update : "Catégorie mise à jour avec succès.",
    delete : "Catégorie supprimée avec succès"
  }
}
