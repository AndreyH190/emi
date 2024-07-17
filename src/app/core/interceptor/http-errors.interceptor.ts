import type {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { ErrorMessages } from './error-messges';
import { MessageService } from 'primeng/api';

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = ErrorMessages[error.status] || ErrorMessages['default'];
      }

      messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      

      return throwError(() => new Error(errorMessage));
    })
  );
};
