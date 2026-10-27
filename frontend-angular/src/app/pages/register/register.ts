import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';

  constructor(
    public auth: Auth
  ) {}

  handleSubmit() {
    if (
      !this.name ||
      !this.email ||
      !this.password
    ) {
      return;
    }

    this.auth.register(
      this.name,
      this.email,
      this.password
    );
  }
}
