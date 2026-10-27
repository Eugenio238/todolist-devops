import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  title = '';
  description = '';

  @Output()
  create = new EventEmitter<{
    title: string;
    description: string;
  }>();

  handleSubmit() {
    if (!this.title.trim()) {
      return;
    }

    this.create.emit({
      title: this.title,
      description: this.description,
    });

    this.title = '';
    this.description = '';
  }
}
