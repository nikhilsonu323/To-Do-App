import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Task } from '../Models/Task';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'https://localhost:7285/api/Tasks';

  onTasksChange: Subject<void> = new Subject()
  editTask: Subject<Task> = new Subject();

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
    return this.http.put(this.url+'/Update', task);
  }

  deleteTask(taskId: number){
    return this.http.delete(this.url+'/'+taskId);
  }

  deleteAllTasks(date?: Date){
    let params = new HttpParams();
    if(date){
      params = params.append("date", date.toISOString())
    }
    return this.http.delete(this.url, {params: params});
  }

  onUsersTasksChanged(){
    this.onTasksChange.next();
  }

  openDialogEditTask(task: Task){
    this.editTask.next(task);
  }
}
