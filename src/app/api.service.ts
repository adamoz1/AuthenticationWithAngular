import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Register a new user
   * @param data - JSON string containing user registration details
   * @returns Observable of the HTTP response
   */
  registerUser(data: String): Observable<any> {
    return this.http.post('http://localhost:1112/register', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Log in an existing user
   * @param data - JSON object containing user login details
   * @returns Observable of the HTTP response
   */
  loginUser(data: any): Observable<any> {
    return this.http.post('http://localhost:1112/login', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   * @param error - HTTP error response
   * @returns Observable that throws an error
   */
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // log to console instead
    alert('An error occurred while processing your request. Please try again.');
    return throwError(error); // return an observable with a user-facing error message
  }
}
