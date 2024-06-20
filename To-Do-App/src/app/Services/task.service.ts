import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Task } from '../Models/Task';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'https://localhost:7285/api/Tasks';
  onTaskAddOrEdit: Subject<void> = new Subject()
  editTask: EventEmitter<Task> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getTasks(date: Date | null,statusId: number | null){
    let params = new HttpParams();
    if(date){
      params = params.append("date", date.toISOString())
    }
    if(statusId){
      params = params.append("statusId", statusId)
    }

    return this.http.get<Task[]>(this.url, {params: params});
  }

  addTask(task: Task){
    return this.http.post(this.url+'/Add', task);
  }

  updateTask(task: Task){
    return this.http.post(this.url+'/Update', task);
  }

  onTaskAddedOrEditedSucessfully(){
    this.onTaskAddOrEdit.next();
  }

  openDialogEditTask(task: Task){
    this.editTask.emit(task);
  }
}
