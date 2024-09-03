import { Component, AfterViewInit } from '@angular/core';
import { fromEvent, of, combineLatest } from 'rxjs';
import {
  debounceTime,
  map,
  filter,
  switchMap,
  catchError,
  delay,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.html'
})
export class SearchComponent implements AfterViewInit {
  results: string[] = [];
  loading: boolean = false;
  error: string | null = null;
  combinedData: any;

  ngAfterViewInit() {
    const searchInput = document.getElementById(
      'search-input'
    ) as HTMLInputElement;

    fromEvent(searchInput, 'input')
      .pipe(
        debounceTime(300),
        map((event) => (event.target as HTMLInputElement).value),
        filter((term) => term.length >= 3),
        switchMap((term) => {
          this.loading = true;
          return of(['Result 1', 'Result 2', 'Result 3']).pipe(
            delay(1000),
            catchError((err) => {
              this.error = 'Error fetching results';
              this.loading = false;
              return of([]);
            })
          );
        })
      )
      .subscribe((results) => {
        this.loading = false;
        this.error = null;
        this.results = results;
      });

    const user$ = of({ name: 'John Doe' }).pipe(delay(1000));
    const posts$ = of([
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ]).pipe(delay(1500));

    combineLatest([user$, posts$])
      .pipe(
        map(([user, posts]) => ({ user, posts })),
        catchError((err) => {
          this.error = 'Error fetching combined data';
          return of(null);
        })
      )
      .subscribe((data) => {
        this.combinedData = data;
        console.log('Combined Data:', data);
      });
  }
}
