import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { ToasterComponent } from './toaster/toaster.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToastService } from './Services/toast.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToasterComponent, SpinnerComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{

  showLoader: boolean = false;
  @ViewChild('contents') contents!: ElementRef;


  constructor(private authService: AuthService, private toatService: ToastService, private cdr: ChangeDetectorRef){ }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.toatService.spinnerSubject.subscribe((data) =>{
      if(!this.showLoader && data){  
        document.body.classList.add('overflow-none');
        this.contents.nativeElement.classList.add('blur');
      }
      this.showLoader = data;
      if(!this.showLoader){  
        document.body.classList.remove('overflow-none');
        this.contents.nativeElement.classList.remove('blur');
      }
      this.cdr.detectChanges()
    })
  }
}
