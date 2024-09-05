import { Component } from '@angular/core';
import { of, timer, throwError } from 'rxjs';
import { catchError, delay, retry, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-error-debugging',
  templateUrl: './error-debugging.component.html',
  styleUrl: './error-debugging.component.css',
})
export class ErrorDebuggingComponent {
  loading = false;
  result: string | null = null;
  error: string | null = null;

  // Simulate an HTTP request with random success/failure
  mockHttpRequest() {
    const isSuccess = Math.random() > 0.5; // 50% chance of success/failure

    return timer(1000).pipe(
      switchMap(() =>
        isSuccess
          ? of('Success: Data received!')
          : throwError(() => new Error('Error: Request failed!'))
      )
    );
  }

  // Method to make the HTTP request
  makeRequest() {
    this.loading = true;
    this.result = null;
    this.error = null;

    this.mockHttpRequest()
      .pipe(
        // Log the initial request
        tap(() => console.log('Request initiated')),

        // Retry 2 times if an error occurs
        retry(2),

        // Handle success and error
        tap((response) => console.log('Received response: ', response)),
        catchError((error) => {
          console.error('Request failed after retries: ', error);
          this.error = error.message;
          return of('Fallback data after error');
        }),

        // Final tap to log after error handling
        tap(() => console.log('Observable completed'))
      )
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.result = response;
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message;
        },
      });
  }
}
