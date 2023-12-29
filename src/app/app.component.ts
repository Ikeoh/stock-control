import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PrimeNGConfig } from 'primeng/api';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    //HttpClientModule,
    //ReactiveFormsModule,

    //Imports do PrimeNG
      //CardModule,
      //InputTextModule,
      //ButtonModule,
      //ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'stock-control';

  constructor(
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true
  }
}
