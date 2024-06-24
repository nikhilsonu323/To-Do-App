import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Statuses } from '../../Models/StatusModels';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';
import { ToastService } from '../../Services/toast.service';


@Component({
  selector: 'task-detail',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit{
  // Chnaged to type task
  @Input() task!: Task;

  statuses = Statuses

  constructor(private taskService: TaskService, private toastService: ToastService){ }

  ngOnInit(): void {
    console.log(this.task);
  }

  editTask(){
    this.taskService.openDialogEditTask(this.task);
  }

  markTaskAsCompleted(){
    this.task.completedOn = new Date();
    this.task.statusId = Statuses.Completed;
    this.taskService.updateTask(this.task).subscribe({
      next: () => {
        this.toastService.show("Task Marked as completed","success");
        this.taskService.onUsersTasksChanged()
      },
      error: () =>{
        this.toastService.show("An error occured","error")
      }
    });
  }
  
  toggleStatus(){
    this.task.statusId = this.task.statusId === Statuses.Active ? Statuses.Completed : Statuses.Active;
    this.taskService.updateTask(this.task).subscribe({
      next: () => {
        this.toastService.show("Task updated sucessfully","success");
        this.taskService.onUsersTasksChanged()
      },
      error: () =>{
        this.toastService.show("An error occured","error")
      }
    });
  }

  deleteTask(){
    this.taskService.deleteTask(this.task.taskId).subscribe({
      next: () => {
        this.toastService.show("Task deleted sucessfully","success");
        this.taskService.onUsersTasksChanged()
      },
      error: () =>{
        this.toastService.show("An error occured","error")
      }
    });
  }

  timeSince(date: Date): string {
    const now = new Date();
    
    const diffInMs = now.getTime() - new Date(date).getTime();
  
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return years + " years ago";
    } else if (months > 0) {
      return months + " months ago";
    } else if (days > 0) {
      return days + " days ago";
    } else if (hours > 0) {
      return hours + " hours ago";
    } else if (minutes > 0) {
      return minutes + " minutes ago";
    } else {
      return "just now";
    }
  }
}
