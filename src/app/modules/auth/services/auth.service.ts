import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetails: BehaviorSubject<any> = new BehaviorSubject(null);
  adminList: BehaviorSubject<string[] | any> = new BehaviorSubject(null);

  constructor(private router: Router, private http: HttpClient) { }

  login(data: any) {
    return fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body:JSON.stringify({
                username: data.username,
                password: data.password
            })
        })
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
}
