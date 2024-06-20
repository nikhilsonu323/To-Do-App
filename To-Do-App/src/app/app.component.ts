import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  constructor(private authService: AuthService){ }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
