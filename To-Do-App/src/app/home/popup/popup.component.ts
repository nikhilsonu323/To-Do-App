import { Component, Input } from '@angular/core';
import { PopupService } from '../../Services/popup.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() heading: string = '';

  constructor(private popupService: PopupService){}

  

}
