import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.token;
    if(!token){
      return next(req);
    }
    
    const modifiedReq = req.clone({
      headers : req.headers.append("Authorization","Bearer " + token)
    });

    return next(modifiedReq);
};
