import { DatePipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'task-list-header',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './task-list-header.component.html',
  styleUrl: './task-list-header.component.css'
})
export class TaskListHeaderComponent {
  today = new Date()
  
  @Input() heading: string = '';
  @Input() showDelete: boolean = false;

}
