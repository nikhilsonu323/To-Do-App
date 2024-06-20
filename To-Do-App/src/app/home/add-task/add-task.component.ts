import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';
import { Statuses } from '../../Models/StatusModels';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit, OnDestroy{
  
  taskForm: FormGroup;
  @Input() task?: Task;
  @Output() onAddTaskComplete: EventEmitter<boolean> = new EventEmitter();

  constructor(private taskService: TaskService){
    this.taskForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    document.body.classList.add('overflow-none');
    if(this.task){
      this.taskForm.setValue({
        title: this.task.title,
        description: this.task.description,
      })
    }
  }
  ngOnDestroy(): void {
    document.body.classList.remove('overflow-none');
  }

  onAddTaskClose(isAdded: boolean){
    this.onAddTaskComplete.emit(isAdded);
  }

  onSubmit(){
    if(this.taskForm.invalid) { return; }
    let formData = this.taskForm.value;
    let task = this.getTaskDetails();
    let taskObs: Observable<Object>;
    if(this.task){
      //Update Mode
      
      taskObs = this.taskService.updateTask(task);
    }
    else{
      //Add Mode
      taskObs = this.taskService.addTask(task);
    }
    taskObs.subscribe({
      next: () => {
        //Handle For success show toaster
        this.taskService.onTaskAddedOrEditedSucessfully();
        this.onAddTaskClose(true);
      },
      error: (err) => console.log(err)      
    })

  }

  private getTaskDetails(){
    let formData = this.taskForm.value;
    let task: Task = {
      userId: 0,
      taskId: this.task?.taskId ?? 0,
      statusId: Statuses.Active,
      title: formData.title,
      description: formData.description,
      createdOn: this.task?.createdOn ?? new Date(),
      completedOn: null,
      status: null,
    }
    return task;
  }
}
