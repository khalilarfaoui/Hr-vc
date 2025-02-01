import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8081/users'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  login(authRequest: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, authRequest);
  }

  getByUsername(username: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/username/${username}`);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAll`);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getUser/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addUser`, user);
  }

  addUser2(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addUser2`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateUser`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteUser/${id}`);
  }

  changePassword(id: any, changePasswordDTO: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/changePassword/${id}`, changePasswordDTO);
  }

  forgetPassword(email: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/forgetPassword/${email}`);
  }

  public message = {
    create: "User created successfully.",
    update: "User updated successfully.",
    delete: "User deleted successfully."
  }
}
