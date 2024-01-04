import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '../../services/user/user.service';
import { signupUserRequest } from '../../models/interface/user/signupUserRequest';
import { authRequest } from '../../models/interface/user/auth/authRequest';
import { TranslationsService } from '../../services/translations/translations.service';

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
    private translationService: TranslationsService,
  ) { }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as authRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();
              this.messageService.add({
                severity: 'success',
                summary: 'success',
                detail: `Bem vindo de volta ${response?.name}!`,
                life: 3000,
              });
            }
          },
          error: (err) => {
            let errorMessage = 'Erro ao fazer login!'; // Mensagem padrão
            if (err && err.error && err.error.error) {
              errorMessage = this.translationService.translateService(err.error.error); // Substitui pela mensagem de erro específica, se disponível
            }
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessage,
              life: 3000,
            });
            console.log(err);
          }
        });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as signupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.signupForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'success',
                detail: `Usuário criado com sucesso!`,
                life: 3000,
              });
            }
          },
          error: (err) => {
            let errorMessage = 'Erro ao criar o usuário!'; // Mensagem padrão
            if (err && err.error && err.error.error) {
              errorMessage = this.translationService.translateService(err.error.error); // Substitui pela mensagem de erro específica, se disponível
            }
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessage,
              life: 3000,
            });
            console.log(err);
          }
        });
    }
  }
}
