import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: [ '', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder) {}

  onSubmitLoginForm(): void {
    console.log('DADOS DO FORMULÁRIO DE LOGIN', this.loginForm.value);
  }
  onSubmitSignupForm(): void {
    console.log('DADOS DE CRIAÇÃO DE CONTA', this.signupForm.value);
  }


}
