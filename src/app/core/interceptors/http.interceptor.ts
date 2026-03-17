import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  console.log(`[HTTP] ${req.method} ${req.urlWithParams}`);

  return next(req).pipe(
    tap(event => {
      if ('status' in event) {
        const elapsed = Date.now() - started;
        console.log(`[HTTP ${event.status}] ${req.method} ${req.urlWithParams} — ${elapsed}ms`);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const elapsed = Date.now() - started;
      console.error(
        `[HTTP ${error.status}] ${req.method} ${req.urlWithParams} — ${error.message} (${elapsed}ms)`
      );
      return throwError(() => error);
    })
  );
};
