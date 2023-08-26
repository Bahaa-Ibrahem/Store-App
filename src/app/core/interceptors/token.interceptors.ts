import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading/loading.service';
import { environment } from 'src/environments/environment';
import { AlertService } from '../services/alert/alert.service';

@Injectable({
  providedIn: 'root',
})

export class TokenInterceptor implements HttpInterceptor {

  private token: string | null = null;

  constructor(private loadingService: LoadingService, private router: Router, private alertService: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger

    this.token = localStorage.getItem('token');

    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.token ? this.token : ''}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Language': environment.defaultLang,
        'Cache-Control': 'max-age=31536000'
      }
    });

      this.loadingService.setLoading(true, request.url);
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/auth/login');
            return throwError(error);
          } else {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 500 || error.status === 502 || error.status === 503) {
                this.alertService.error(error.error ? error.error.errorMessage ? error.error.errorMessage : '!Technical Error!' : '!Technical Error!');
              } else if (error.status === 400) {
                this.alertService.error(error.error ? error.error.errorMessage ? error.error.errorMessage : '!BAD REQUEST!' : '!BAD REQUEST!');
              } else if (error.status === 404) {
                this.alertService.error(error.error ? error.error.errorMessage ? error.error.errorMessage : '!METHOD NOT FOUND!' : '!METHOD NOT FOUND!');
              } else {
                this.alertService.error(error.error ? error.error.errorMessage ? error.error.errorMessage : '!SYSTEM ERROR!' : '!SYSTEM ERROR!');
              }
            }

            return throwError(error);
          }
        }),
        finalize(() => this.loadingService.setLoading(false, request.url))
      );
  }
}
