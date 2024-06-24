import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  addOverflowNone(){
    document.body.classList.add('overflow-none');
  }
  
  removeOverflowNone(){
    document.body.classList.remove('overflow-none');
  }
}
