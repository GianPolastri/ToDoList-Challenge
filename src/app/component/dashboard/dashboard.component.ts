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

  constructor(private crudServide: CrudService){}

  ngOnInit(): void {
    this.newTask = new Task();
    this.allTask = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudServide.getAllTask().subscribe(res => {
      this.allTask = res;
    }, err => { alert(err); });
  }

  addTask(etask: Task){
    this.crudServide.addTask(etask).subscribe(res=>{
      this.ngOnInit();
    }, err => { alert(err); })
  }

  editTask(){
    this.crudServide.editTask(this.newTask).subscribe(res => {
      this.ngOnInit();
    }, err => { alert('An error has occured while updating the task') });
  }

  deleteTask(etask: Task){
    this.crudServide.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => { alert('Failed to delete the task')})
  }


}
