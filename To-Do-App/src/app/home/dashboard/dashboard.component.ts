import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgFor, DecimalPipe } from '@angular/common';
import { TaskListHeaderComponent } from '../task-list-header/task-list-header.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [HeaderComponent, NgFor, DecimalPipe, TaskListHeaderComponent, TaskListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  today = new Date();
  tasks: Task[] = [];

  constructor(private taskService: TaskService){ }

  ngOnInit(): void {
    this.fetchTasks();
    this.taskService.onTaskAddOrEdit.subscribe(() =>{
      this.fetchTasks();
    })
  }

  private fetchTasks(){
    this.taskService.getTasks(new Date(), null).subscribe(data =>{
      this.tasks = data;
    });
  }
}
