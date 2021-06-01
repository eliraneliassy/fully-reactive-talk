import { Book, BooksSearchFilters } from './book';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface BooksState {
  books: Book[];
  totalCount: number;
  filters: BooksSearchFilters;
}

@Injectable()
export class BooksStore extends ComponentStore<BooksState> {

  constructor() {
    super({
      books: [],
      totalCount: 0,
      filters: {
        term: '',
        page: 0,
        itemsPerPage: 5
      }
    });
  }

  readonly books$: Observable<Book[]> = this.select(state => state.books);
  readonly filters$: Observable<BooksSearchFilters> = this.select(state => state.filters);
  readonly totalCount$: Observable<number> = this.select(state => state.totalCount);
}