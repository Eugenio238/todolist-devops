import { Injectable, signal } from '@angular/core';

import { Api } from './api';

import {
  Todo as TodoModel,
  CreateTodoData,
  UpdateTodoData,
} from '../models/todo';

interface TodoResponse {
  todo: TodoModel;
}

@Injectable({
  providedIn: 'root',
})
export class Todo {
  todos = signal<TodoModel[]>([]);

  isLoading = signal(false);
  isCreating = signal(false);
  isUpdating = signal(false);

  error = signal<string | null>(null);

  constructor(private api: Api) {}

  loadTodos() {
    this.isLoading.set(true);
    this.error.set(null);

    this.api
      .get<TodoModel[]>('/todos')
      .subscribe({
        next: (response) => {
          this.todos.set(response);
        },

        error: (error) => {
          this.error.set(
            error.error?.message ||
              'Impossible de charger les tâches.'
          );

          this.isLoading.set(false);
        },

        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  createTodo(data: CreateTodoData) {
    this.isCreating.set(true);
    this.error.set(null);

    this.api
      .post<TodoResponse>('/todos', data)
      .subscribe({
        next: (response) => {
          this.todos.update((todos) => [
            response.todo,
            ...todos,
          ]);
        },

        error: (error) => {
          this.error.set(
            error.error?.message ||
              'Impossible de créer la tâche.'
          );

          this.isCreating.set(false);
        },

        complete: () => {
          this.isCreating.set(false);
        },
      });
  }

  updateTodo(
    id: number,
    data: UpdateTodoData
  ) {
    this.isUpdating.set(true);
    this.error.set(null);

    this.api
      .put<TodoResponse>(
        `/todos/${id}`,
        data
      )
      .subscribe({
        next: (response) => {
          this.todos.update((todos) =>
            todos.map((todo) =>
              todo.id === id
                ? response.todo
                : todo
            )
          );
        },

        error: (error) => {
          this.error.set(
            error.error?.message ||
              'Impossible de modifier la tâche.'
          );

          this.isUpdating.set(false);
        },

        complete: () => {
          this.isUpdating.set(false);
        },
      });
  }

  deleteTodo(id: number) {
    this.api
      .delete(`/todos/${id}`)
      .subscribe({
        next: () => {
          this.todos.update((todos) =>
            todos.filter(
              (todo) => todo.id !== id
            )
          );
        },

        error: (error) => {
          this.error.set(
            error.error?.message ||
              'Impossible de supprimer la tâche.'
          );
        },
      });
  }

  toggleTodo(todo: TodoModel) {
    this.updateTodo(todo.id, {
      completed: !todo.completed,
    });
  }
}
