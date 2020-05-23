import { TugendService } from './../../../services/tugend.service';
import { Tugend } from './../../../models/Tugend';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-tugenden',
  templateUrl: './todo-tugenden.component.html',
  styleUrls: ['./todo-tugenden.component.css']
})
export class TodoTugendenComponent implements OnInit {

  constructor(private tugendService: TugendService) { }

  todoTugenden: Observable<Tugend[]>;

  ngOnInit(): void {
    this.todoTugenden = this.tugendService.getTodoTugenden();

    this.todoTugenden.subscribe(data => {
      console.log(data);});
      console.log(this.todoTugenden);
  }

}
