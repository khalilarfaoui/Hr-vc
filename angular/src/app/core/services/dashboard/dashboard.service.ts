import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderDashboard } from '../../models/header-dashboard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


private readonly apiUrl = 'http://localhost:8081/dashboard'; // Remplacez par l'URL réelle de votre API

  constructor(private http: HttpClient) {}

  getHeaderDashboard(): Observable<HeaderDashboard> {
    return this.http.get<HeaderDashboard>(this.apiUrl);
  }
  getCategoryOffreDashboard(): Observable<HeaderDashboard> {
    return this.http.get<HeaderDashboard>(this.apiUrl+"/count-by-category");
  }
}
