import { Injectable } from '@angular/core';
import { AuthResponse, User } from '../Models/AuthModels';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://localhost:7285/api/Auth';
  token: string | null = null;

  constructor(private http: HttpClient, private router: Router, private toastService: ToastService) { }

  login(user: User){
    return this.http.post<{token: string}>(this.url+'/login',user).pipe(
      catchError((err)=> this.handleError(err)), 
      tap((res) => {
        this.toastService.show("Login successful. You're now signed in.","success")
        this.handleToken(res);
      }));
  }
  
  signup(user: User){
    return this.http.post(this.url+'/signup',user).pipe(
      catchError((err)=> this.handleError(err)),
      tap((res) => this.toastService.show("Sign up successful!","success")) );
  }

  logout(){
    console.log("Removing item");
    
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }

  autoLogin(){
    let token = localStorage.getItem("token");
    if(!token){
      return;
    }
    this.token = token;
  }

  private handleError(err: any){
    console.log(err);
    
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

  private handleToken(response: {token: string}){
    this.token = response.token;
    debugger
    localStorage.setItem("token", this.token);
    this.router.navigate(['dashboard']);
  }
}