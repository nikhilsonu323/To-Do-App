import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TaskListHeaderComponent } from '../task-list-header/task-list-header.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';
import { Statuses } from '../../Models/StatusModels';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [HeaderComponent, TaskListHeaderComponent, TaskListComponent],
  templateUrl: './active.component.html',
  styleUrl: './active.component.css'
})
export class ActiveComponent implements OnInit, OnDestroy{
  activeTasks: Task[] = [];
  taskChangesSubsricption!: Subscription;
  
  constructor(private taskService: TaskService){ }

  ngOnInit(): void {
    this.fetchTasks();
    this.taskChangesSubsricption = this.taskService.onTasksChange.subscribe(() =>{
      this.fetchTasks();
    })
  }

  ngOnDestroy(): void {
    this.taskChangesSubsricption.unsubscribe()
  }

  private fetchTasks(){
    console.log("Called From Active");
    this.taskService.getTasks(null, Statuses.Active).subscribe(data =>{
      this.activeTasks = data;
    });
  }
}
