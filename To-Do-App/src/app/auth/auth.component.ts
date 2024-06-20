import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AuthResponse } from '../Models/AuthModels';
import { Observable } from 'rxjs';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  isLoginPage = false;
  showPassword = false;
  errrorMessage: string | null = null;
  authForm: FormGroup;
  @ViewChild('passwordField') passwordField!: ElementRef;
 
  constructor(private router: Router, private authService: AuthService){
    this.authForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn){
      this.router.navigate(["dashboard"]);
    }
    this.authForm.valueChanges.subscribe(()=>{
      this.errrorMessage = null;
    })
  }

  toggleMode(){
    this.isLoginPage = !this.isLoginPage;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.passwordField.nativeElement.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit(){
    let authObs: Observable<AuthResponse>;
    if(this.authForm.invalid){ return; }
    if(this.isLoginPage){
      authObs = this.authService.login(this.authForm.value);
    }
    else{
      authObs = this.authService.signup(this.authForm.value);
    }
    authObs.subscribe({
      error: (err) => {
        this.errrorMessage = err;
      }
    });
  }
}
