import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  filter,
  startWith,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { Observable, of, combineLatest } from 'rxjs';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit {
  searchControl = new FormControl('');
  errorMsg: string = '';
  allBooks$: Observable<Book[]> = of([]);
  filteredBooks$: Observable<Book[]> = of([]);
  loading: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchAllBooks();
    this.initializeSearch();
  }

  fetchAllBooks(): void {
    this.allBooks$ = this.bookService.getAllBooks().pipe(
      catchError((error) => {
        this.errorMsg = 'Failed to load books.';
        return of([]);
      })
    );
  }

  initializeSearch(): void {
    this.filteredBooks$ = combineLatest([
      this.allBooks$,
      this.searchControl.valueChanges.pipe(
        debounceTime(1000),
        startWith(''),
        filter((term: string | null): term is string => term !== null)
      ),
    ]).pipe(
      switchMap(([books, term]) => {
        if (term.trim().length < 3 && term.trim().length > 0) {
          this.errorMsg = 'Please enter at least 3 characters to search.';
          return of([]);
        } else {
          this.errorMsg = '';
          if (term.trim().length === 0) {
            return of(books);
          }
          return this.bookService.searchBooks(term).pipe(
            catchError((error) => {
              this.errorMsg = 'Error occurred while searching.';
              return of([]);
            })
          );
        }
      })
    );
  }
}
