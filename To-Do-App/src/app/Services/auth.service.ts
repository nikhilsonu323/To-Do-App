import { Injectable } from '@angular/core';
import { AuthResponse, User } from '../Models/AuthModels';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://localhost:7285/api/Auth';
  isLoggedIn = false;
  token: string | null = null;
  logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User){
    return this.http.post<AuthResponse>(this.url+'/login',user).pipe(
      catchError((err)=> this.handleError(err)), 
      tap((res) => this.handleCreateUser(res)));
  }
  
  signup(user: User){
    return this.http.post<AuthResponse>(this.url+'/signup',user).pipe(
      catchError((err)=> this.handleError(err)),
      tap((res) => this.handleCreateUser(res)));
  }

  logout(){
    this.isLoggedIn = false;
    localStorage.removeItem("authDetails");
    if(this.logoutTimer){
      clearTimeout(this.logoutTimer);
    }
    this.router.navigate(['login']);
  }

  autoLogout(expiresInMS: number){
    this.logoutTimer = setTimeout(() =>{
      this.logout();
    }, expiresInMS);
  }

  autoLogin(){
    let storedResponse = localStorage.getItem("authDetails");
    if(!storedResponse){
      return;
    }
    let authDetails = JSON.parse(storedResponse);
    this.token = authDetails.token;
    this.isLoggedIn = true;
    let expiresInMs = new Date(authDetails.expiresIn).getTime() - new Date().getTime();
    this.autoLogout(expiresInMs);
  }

  private handleError(err: any){
    let errorMessage = 'An Unkonwn error Has occured';
    if(!err.error || !err.error.error){
      return throwError(() => errorMessage);
    }
    switch(err.error.error.message){
      case 'Invalid_Credentials':
        errorMessage = 'Invalid Credentials';
        break;
      case 'User_Exists':
        errorMessage = 'User with this username already exists';
        break;
    }
    return throwError(() => errorMessage);
  }

  private handleCreateUser(response: AuthResponse){

    let expiresInMS = new Date().getTime() + (response.expiresIn * 1000);
    let expiresInDate = new Date(expiresInMS);

    this.token = response.token;

    let authDetails = {
      token: response.token,
      expiresIn: expiresInDate
    }
    this.autoLogout(response.expiresIn * 1000);

    localStorage.setItem("authDetails", JSON.stringify(authDetails));
    this.isLoggedIn = true;
    this.router.navigate(['dashboard']);
  }
}