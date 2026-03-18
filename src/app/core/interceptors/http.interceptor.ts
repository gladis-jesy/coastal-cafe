import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

/**
 * Captures timing at the request boundary so elapsed duration includes both network
 * latency and server processing time, giving a realistic figure for performance monitoring.
 *
 * The 'status' in event guard is necessary because Angular emits multiple event types
 * (HttpSentEvent, HttpHeaderResponse, HttpResponse) through the same observable — only
 * HttpResponse carries a status code that is meaningful to log.
 *
 * Errors are re-thrown via throwError so the interceptor stays transparent: callers that
 * handle errors themselves won't have their catch blocks silently swallowed here.
 */
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
