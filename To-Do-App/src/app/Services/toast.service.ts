import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage } from '../Models/ToastModels';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  private toastSubject = new Subject<ToastMessage>();
  toastState = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toastSubject.next({ message, type });
  }

}
