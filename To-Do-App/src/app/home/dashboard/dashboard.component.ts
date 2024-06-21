import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
import { TaskListHeaderComponent } from '../task-list-header/task-list-header.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';
import { Statuses } from '../../Models/StatusModels';
import { StatCardComponent } from '../stat-card/stat-card.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [HeaderComponent, NgFor, TaskListHeaderComponent, TaskListComponent, StatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  today = new Date();
  // tasks: Task[] = [];
  statuses = Statuses
  activeTasks: Task[] = [];
  completedTasks: Task[] = [];

  activeTasksPercent: number = 0;
  completedTasksPercent: number = 0;

  constructor(private taskService: TaskService){ }

  ngOnInit(): void {
    this.fetchTasks();
    this.taskService.onTasksChange.subscribe(() =>{
      this.fetchTasks();
    })
  }

  private fetchTasks(){
    // this.taskService.getTasks(null, null).subscribe(data =>{
    //   this.tasks = data;
    // });

    this.taskService.getTasks(null, Statuses.Active).subscribe(data =>{
      this.activeTasks = data;
      this.calculatePercentage();
    });

    this.taskService.getTasks(null, Statuses.Completed).subscribe(data =>{
      this.completedTasks = data;
      this.calculatePercentage();
    });
  }

  private calculatePercentage(){
    if(this.completedTasks.length === 0 && this.activeTasks.length === 0){
      this.completedTasksPercent = 0;
      this.activeTasksPercent = 0;
      return;
    }
    this.completedTasksPercent = this.activeTasks.length === 0 ? 100 : 0;
    this.activeTasksPercent = this.completedTasks.length === 0 ? 100 : 0;

    if(this.completedTasks.length !== 0 && this.activeTasks.length !== 0){
      let value = (1/(this.activeTasks.length+this.completedTasks.length)) * 100;
      this.activeTasksPercent = value * this.activeTasks.length;
      this.completedTasksPercent = value * this.completedTasks.length;
    }
  }
}
