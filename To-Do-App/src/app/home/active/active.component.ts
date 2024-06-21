import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TaskListHeaderComponent } from '../task-list-header/task-list-header.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';
import { Statuses } from '../../Models/StatusModels';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [HeaderComponent, TaskListHeaderComponent, TaskListComponent],
  templateUrl: './active.component.html',
  styleUrl: './active.component.css'
})
export class ActiveComponent {
  activeTasks: Task[] = [];
  
  constructor(private taskService: TaskService){ }

  ngOnInit(): void {
    this.fetchTasks();
    this.taskService.onTasksChange.subscribe(() =>{
      this.fetchTasks();
    })
  }

  private fetchTasks(){
    this.taskService.getTasks(null, Statuses.Active).subscribe(data =>{
      this.activeTasks = data;
    });
  }
}
