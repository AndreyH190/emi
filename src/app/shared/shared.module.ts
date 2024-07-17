import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitServiceService } from './services/git-service.service';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    ChartModule,
    ToastModule
  ],
  providers: [
    GitServiceService
  ],
  exports: [
    InputTextModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    ChartModule,
    ToastModule
  ]
})
export class SharedModule { }
