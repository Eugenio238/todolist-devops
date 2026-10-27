import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  @Input()
  todos: Todo[] = [];

  @Input()
  isLoading = false;

  @Output()
  toggle = new EventEmitter<Todo>();

  @Output()
  edit = new EventEmitter<Todo>();

  @Output()
  delete = new EventEmitter<number>();
}
