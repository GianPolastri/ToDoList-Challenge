import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Task } from 'src/app/model/task'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  newTask: Task = new Task();
  allTask: Task[] = [];

  newTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudServide: CrudService){}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.newTaskValue = '';
    this.newTask = new Task();
    this.allTask = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudServide.getAllTask().subscribe(res => {
      this.allTask = res;
    }, err => { alert(err); });
  }

  addTask(){
    this.newTask.task_name = this.newTaskValue;

    this.crudServide.addTask(this.newTask).subscribe(res=>{
      this.ngOnInit();
      this.newTaskValue = '';
    }, err => { alert(err); })
  }

  editTask(){
    if(this.editTaskValue.length !== 0){
      this.newTask.task_name = this.editTaskValue
      this.crudServide.editTask(this.newTask).subscribe(res => {
        this.ngOnInit();
      }, err => { alert('An error has occured while updating the task') });
    }
    else throw new Error('It´s not possible to leave a task empty')  
  }

  deleteTask(etask: Task){
    this.crudServide.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => { alert('Failed to delete the task')})
  }

  call(etask: Task){

    this.newTask = etask;
    this.editTaskValue = etask.task_name;

  }


}
