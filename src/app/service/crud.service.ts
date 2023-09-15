import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/task'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL: string; 

  constructor( private http : HttpClient) {
    this.serviceURL = "http://localhost:3000/task"
   }

   addTask(task: Task): Observable<Task> {
    if(task.task_name.length !== 0) return this.http.post<Task>(this.serviceURL, task);
    else throw new Error('The task cannot be empty');
   }
   getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
   }
   deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.serviceURL+'/'+task.id);
   }
   editTask(task: Task): Observable<Task> {
    if(task.task_name.length !== 0) return this.http.put<Task>(this.serviceURL+'/'+task.id, task);
    else throw new Error('It´s not possible to leave a task empty');
   }
}
