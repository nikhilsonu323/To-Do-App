import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AuthResponse } from '../Models/AuthModels';
import { Observable } from 'rxjs';
import { ToastService } from '../Services/toast.service';

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
 
  constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute, private toastService: ToastService){
    this.authForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data =>{
      let authType = data['mode'];
      this.isLoginPage = authType === 'login' 
    })
    if(this.authService.token){
      this.router.navigate(["dashboard"]);
    }
    this.authForm.valueChanges.subscribe(()=>{
      this.errrorMessage = null;
    })
  }

  toggleMode(){
    if(this.isLoginPage)
      this.router.navigate(['signup']);
    else
      this.router.navigate(['login']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.passwordField.nativeElement.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit(){
    let authObs: Observable<any>;
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
        this.toastService.show(this.errrorMessage!, 'error')
      }
    });
  }
}
