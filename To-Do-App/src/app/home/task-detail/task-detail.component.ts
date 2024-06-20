import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Statuses } from '../../Models/StatusModels';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';


@Component({
  selector: 'task-detail',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  // Chnaged to type task
  @Input() task!: Task;

  statuses = Statuses

  constructor(private taskService: TaskService){ }

  editTask(){
    this.taskService.openDialogEditTask(this.task);
  }
}
