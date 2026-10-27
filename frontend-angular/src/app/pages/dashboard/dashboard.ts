import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Auth } from '../../services/auth';
import { Todo } from '../../services/todo';

import { Todo as TodoModel } from '../../models/todo';

import { TodoForm } from '../../components/todo-form/todo-form';
import { TodoList } from '../../components/todo-list/todo-list';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    RouterLink,
    TodoForm,
    TodoList,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  editingTodo: TodoModel | null = null;

  constructor(
    public auth: Auth,
    public todoService: Todo
  ) {}

  ngOnInit() {
    this.auth.loadUser();
    this.todoService.loadTodos();
  }

  handleCreate(data: {
    title: string;
    description: string;
  }) {
    this.todoService.createTodo(data);
  }

  handleEdit(todo: TodoModel) {
    this.editingTodo = {
      ...todo,
    };
  }

  handleSaveEdit() {
    if (!this.editingTodo) {
      return;
    }

    this.todoService.updateTodo(
      this.editingTodo.id,
      {
        title: this.editingTodo.title,
        description: this.editingTodo.description || '',
      }
    );

    this.editingTodo = null;
  }

  handleCancelEdit() {
    this.editingTodo = null;
  }

  handleToggle(todo: TodoModel) {
    this.todoService.toggleTodo(todo);
  }

  handleDelete(id: number) {
    this.todoService.deleteTodo(id);
  }

  handleLogout() {
    this.auth.logout();
  }
}


//Ce fichier est notre composant parent principale , il orchestre les deux composants TodoForm et TodoList.
//Dans dashboard.html, nous avons <app-todo-form(create)="handleCreate($event)"/> et aussi
// <app-todo-list  [todos]="todoService.todos()" [isLoading]="todoService.isLoading()"(toggle)="handleToggle($event)" (edit)="handleEdit($event)" (delete)="handleDelete($event)"/>
//Le dashboard coordonne bien les actions
//On a un constructeur on connait déjà le principe de l'injection de dépendances « Dashboard a besoin de Auth et de Todo, je vais lui fournir ces objets. »
//ngOnInit() est un cycle de vie Angular.Exécuté lorsque le composant est iunitialisé
//Dashboard créé
//      ↓
//ngOnInit()
//      ↓
//loadUser()
//      ↓
//loadTodos()
//loadUser permet d'avoir l'user connecté et son token pour pouvoir faire les requetes sur l'API
//loadTodos permet de récupérer les todos de l'utilisateur connecté

//TodoForm est un composant enfant de Dashboard

//                               (Donc nous sommes au niveau de la transmission de données enfant vers parent )
//Dans dashboard.html nous avons <app-todo-form(create)="handleCreate($event)"/>
//C'est ici que la communication se fait entre le composant parent et le composant enfant
//Dans le composant enfant TodoForm nous avons @Output() create = new EventEmitter<{
//   title: string;
//   description: string;
// }>();
//@Ouptut() permet au composant enfant d'envoyer des données au composant parent
//new EventEmitter<{
//    title: string;
//    description: string;
//  }>();
//EventEmitter est une classe qui permet de créer un évènement avec les données que celà va contenir
// Dans le handleSubmit() de TodoForm nous avons this.create.emit({title: this.title, description: this.description})
//On transmet notre évènement et ses données au composant parent Dashboard grace à émit() et on le récupère dans le composant parent Dashboard grace à (create)="handleCreate($event)"
//Donc le parent recoit et transmet à la fonction handleCreate(data: {title: string; description: string;}) qui va appeler la fonction createTodo(data) du service Todo



//                    Transmission de données du parent vers l'enfant avec @Input
// Dans TodoList nous avons
// @Input()
// todos: Todo[] = [];
//@Input signifie que TodoList peut recevoir des données du parent Dashboard
//Dans Dashboard nous avons
//  <app-todo-list
//  [todos]="todoService.todos()"
//Prends la valeur de todoService.todos() et donne-la à la propriété todos du composant TodoList.
// Les crochets signifient qu'on fait un property binding , un peu comme v-bind dans vue js 
