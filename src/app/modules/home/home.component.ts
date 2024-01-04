import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '../../services/user/user.service';
import { signupUserRequest } from '../../models/interface/user/signupUserRequest';
import { authRequest } from '../../models/interface/user/auth/authRequest';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
  ) { }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as authRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              alert('Usuário logado com sucesso!');
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();
              this.messageService.add({
                severity: 'success',
                summary: 'success',
                detail: 'Bem vindo de volta ${response?.name}!',
                life: 2000,
              });
            }
          },
          error: (err) => {
            alert('Erro ao logar!');
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Erro ao fazer o login!',
              life: 2000,
            });
            console.log(err);
          },
        });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as signupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              alert('Usuário criado com sucesso!');
              this.signupForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'success',
                detail: 'Usuário criado com sucesso!',
                life: 2000,
              });
            }
          },
          error: (err) => {
            alert('Erro ao criar Usuário!');
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Erro ao criar o usuário!',
              life: 2000,
            });
            console.log(err);
          },
        });
    }
  }
}
