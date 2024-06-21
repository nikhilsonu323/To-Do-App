import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgIf, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  selectedOption = {value: '/dashboard', name: 'Dashbooard'};
  showDropdown = false;
  routes = [{value: '/dashboard', name: 'Dashbooard'},{value: '/active', name: 'Active'}, {value: '/completed', name: 'Completed'}];
  @Output() onAddTaskClick: EventEmitter<null> = new EventEmitter()
  @ViewChild('SelectedOption') selectedOptionDiv!: ElementRef;

  constructor(private router: Router, private authService: AuthService){ }

  ngOnInit(): void {
    let url = window.location.href.split('/');
    let currentRoute = '/'+url[url.length-1];
    for (let i = 0; i < this.routes.length; i++){
      if(this.routes[i].value == currentRoute){
        this.selectedOption = this.routes[i];
        break;
      }
    }
  }
      

  addTask() {
    this.onAddTaskClick.emit()
  }
  signout(){
    debugger
    this.authService.logout();

  }

  onDropdownChange(route: any){
    this.selectedOption = route;
    this.router.navigate([this.selectedOption.value]);
    this.showDropdown = false;
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }
}
