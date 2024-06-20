import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TaskListHeaderComponent } from '../task-list-header/task-list-header.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';
import { Statuses } from '../../Models/StatusModels';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [HeaderComponent, TaskListHeaderComponent, TaskListComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent {
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService){ }

  ngOnInit(): void {
    this.fetchTasks();
    this.taskService.onTaskAddOrEdit.subscribe(() =>{
      this.fetchTasks();
    })
  }

  private fetchTasks(){
    this.taskService.getTasks(new Date(), null).subscribe(data =>{
      this.completedTasks = data;
    });
  }
}
