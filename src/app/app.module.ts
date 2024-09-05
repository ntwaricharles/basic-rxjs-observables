import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchComponent } from './components/search/search.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDebuggingComponent } from './error-debugging/error-debugging.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsComponent,
    SearchComponent,
    BookSearchComponent,
    BookListComponent,
    ErrorDebuggingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
