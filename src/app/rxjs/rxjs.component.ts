import { Component, OnInit } from '@angular/core';
import { of, from, interval, throwError, concat } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit {
  ngOnInit(): void {
    // Task 1: Creating and Subscribing to an Observable with `of`
    const numbers$ = of(1, 2, 3, 4, 5);
    numbers$.subscribe({
      next: (value) => console.log(`Number: ${value}`),
      complete: () => console.log('Sequence complete'),
    });

    // Task 2: Working with `from`
    const colors = ['White', 'Black', 'Blue', 'Yellow'];
    const colors$ = from(colors);
    colors$.subscribe({
      next: (color) => console.log(`Color: ${color}`),
      complete: () => console.log('All colors emitted'),
    });

    // Task 3: Using `interval`
    const interval$ = interval(1000).pipe(take(5));
    interval$.subscribe({
      next: (value) =>
        console.log(
          `Value: ${value}, Timestamp: ${new Date().toLocaleTimeString()}`
        ),
      complete: () => console.log('Interval complete'),
    });

    // Task 4: Combining Observables using `concat`
    const numbersObservable$ = of(1, 2, 3);
    const moreNumbers$ = from([4, 5, 6]);
    const combined$ = concat(numbersObservable$, moreNumbers$);
    combined$.subscribe({
      next: (value) => console.log(`Combined Value: ${value}`),
      complete: () => console.log('Combined sequence complete'),
    });

    // Task 5: Error Handling
    const safeNumbers$ = of(1, 2);
    const error$ = throwError('An error occurred!');
    const errorObservable$ = concat(safeNumbers$, error$);
    errorObservable$.subscribe({
      next: (value) => console.log(`Value: ${value}`),
      error: (err) => console.error(`Caught error: ${err}`),
      complete: () => console.log('Error handling sequence complete'),
    });
  }
}
