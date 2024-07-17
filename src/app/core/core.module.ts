import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { scoreGuard } from './guard/score.guard';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { httpErrorsInterceptor } from './interceptor/http-errors.interceptor';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    LoadingComponent,
    HttpClientModule
  ],
  providers: [
    scoreGuard,
    MessageService,
    provideHttpClient(
      withInterceptors([httpErrorsInterceptor])
    )
  ]
})
export class CoreModule { }
