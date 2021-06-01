import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of, Subject, combineLatest } from 'rxjs';
import { Book, BooksSearchFilters } from './book';
import { BooksService } from './books.service';
import { map, switchMap, filter, debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { BooksStore } from './books-store.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [BooksStore],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  books: Book[] = [];
  totalCount: number = 0;
  isLoading: boolean = false;
  search$: Subject<string> = new Subject<string>();

  constructor(
    private readonly booksStore: BooksStore,
    private readonly booksService: BooksService) { }

  ngOnInit(): void {

    this.booksStore.filters$.pipe(
      filter(filter => !!filter.term),
      tap(() => this.booksStore.updater(store => ({ ...store, loading: true }))),
      switchMap((filters: BooksSearchFilters) => this.booksService.getBooks(filters)),
      tap(() => this.booksStore.updater(store => ({ ...store, loading: false })))

    ).subscribe(
      (res) => this.booksStore.setState(state => ({ ...state, books: res.books, totalCount: res.totalItems }))
    );

    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((term) => this.booksStore.setState(state => ({
      ...state, filters: { ...state.filters, term }
    })));

    this.booksStore.books$.subscribe(books => this.books = books);
    this.booksStore.totalCount$.subscribe(count => this.totalCount = count);
    this.booksStore.isLoading$.subscribe(loading => this.isLoading = loading);
  }

  search(term: string) {
    this.search$.next(term);
  }

  pageChange(event: PageEvent) {
    this.booksStore.setState(state => ({
      ...state, filters: {
        ...state.filters,
        page: event.pageIndex,
        itemsPerPage: event.pageSize
      }
    }))
  }
}
