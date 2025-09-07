import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';
  
  // BehaviorSubject to manage authentication state
  private isAuthenticatedSubject: BehaviorSubject<boolean>;

  // Inject PLATFORM_ID to handle SSR
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize the BehaviorSubject on service creation, checking the platform
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  }

  // An observable that components can subscribe to for real-time auth status
  public get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // --- API Calls ---

  public register(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  public login(credentials: any): Observable<{ token: string }> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<{ token: string }>(url, credentials)
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.isAuthenticatedSubject.next(true); // Update the state
        }),
        catchError(this.handleError)
      );
  }

  public logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false); // Update the state
    this.router.navigate(['/login']);
  }

  // --- Token Management ---

  private saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.getToken();
    }
    return false; // On the server, there is no token
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // --- Error Handling ---

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    // Server-side error
    if (error.status === 400 && error.error && error.error.message) {
      errorMessage = error.error.message;
    } else {
      // General error (network, client-side, etc.)
      errorMessage = `Server returned code: ${error.status}, body was: ${JSON.stringify(error.error)}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}