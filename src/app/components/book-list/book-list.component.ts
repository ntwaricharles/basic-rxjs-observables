import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Observable, of } from 'rxjs';
import { Author } from '../../models/book.model';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  @Input() books: Book[] = [];
  authors: { [key: number]: Author } = {};

  constructor(private bookService: BookService) {}

  getAuthor(authorId: number): Observable<Author | undefined> {
    if (this.authors[authorId]) {
      return of(this.authors[authorId]);
    }
    return this.bookService.getAuthorById(authorId).pipe(
      switchMap((author) => {
        if (author) {
          this.authors[authorId] = author;
        }
        return of(author);
      }),
      catchError((error) => {
        console.error('Error fetching author:', error);
        return of(undefined);
      })
    );
  }
}
