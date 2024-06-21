import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.token;
    if(!token){
      return next(req);
    }

    const modifiedReq = req.clone({
      headers : req.headers.append("Authorization","Bearer " + token)
    });

    return next(modifiedReq).pipe(catchError((err: HttpErrorResponse) =>{
      if(err.status == 401){
        router.navigate(['login']);
      }

      return throwError(() => err)
    }));
};
