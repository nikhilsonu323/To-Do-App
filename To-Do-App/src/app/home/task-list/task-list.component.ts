import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { Task } from '../../Models/Task';
import { Statuses } from '../../Models/StatusModels';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, TaskDetailComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  
  @Input() tasks: Task[] = [];
  @ViewChild('tasklist') taskListContainer!: ElementRef;

  statuses = Statuses
 
  taskDetailsId: null | number = null;

  ngOnInit(): void {
    document.body.addEventListener('click', (event: Event) => this.handleClickOutside(event));
  }
  
  showTaskDetails(index: number){
    this.taskDetailsId = index;
  }

  private handleClickOutside(event: Event) {
    if (event.target === this.taskListContainer.nativeElement || !this.taskListContainer.nativeElement.contains(event.target as Node)) {
      this.taskDetailsId = null;
    }
  }
}
