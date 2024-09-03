import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Book, Author } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Enchanted Forest',
      synopsis:
        'Explore the mysteries and wonders hidden within the enchanted forest.',
      authorId: 101,
      publishedDate: new Date('2024-01-15T09:00:00Z'),
      coverImage:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    },
    {
      id: 2,
      title: 'Journey to the Stars',
      synopsis:
        'A thrilling adventure through space and the unknown reaches of the galaxy.',
      authorId: 102,
      publishedDate: new Date('2024-02-20T10:30:00Z'),
      coverImage:
        'https://img.freepik.com/premium-photo/space-astronomy-starry-sky-universe-background-with-galaxy-stars-constellations-night-sky-cosmos-deep-space-vector-illustration_1150-39766.jpg',
    },
    {
      id: 3,
      title: 'Secrets of the Ocean',
      synopsis:
        'Dive deep into the ocean to uncover the secrets and creatures that dwell beneath.',
      authorId: 103,
      publishedDate: new Date('2024-03-10T11:45:00Z'),
      coverImage:
        'https://www.fruitsmith.com/pub/media/mageplaza/blog/post/g/r/green_fruits.jpg',
    },
  ];

  private authors: Author[] = [
    {
      id: 101,
      name: 'Luna Stargazer',
      bio: 'An author fascinated by mythical forests and the magic within.',
    },
    {
      id: 102,
      name: 'Orion Nightfall',
      bio: 'A science fiction writer exploring the vastness of space.',
    },
    {
      id: 103,
      name: 'Marina Deep',
      bio: 'A marine biologist turned author, delving into oceanic mysteries.',
    },
  ];

  constructor() {}

  getAllBooks(): Observable<Book[]> {
    return of(this.books).pipe(delay(1000));
  }

  getAllAuthors(): Observable<Author[]> {
    return of(this.authors).pipe(delay(1000));
  }

  searchBooks(term: string): Observable<Book[]> {
    return of(this.books).pipe(
      delay(500),
      map((books) =>
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(term.toLowerCase()) ||
            book.synopsis.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  getAuthorById(authorId: number): Observable<Author | undefined> {
    return of(this.authors.find((author) => author.id === authorId)).pipe(
      delay(500)
    );
  }
}
