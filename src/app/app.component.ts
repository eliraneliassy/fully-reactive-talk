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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  books$ = this.booksStore.books$;
  totalCount$ = this.booksStore.totalCount$;
  search$: Subject<string> = new Subject<string>();
  
  viewObs$ = combineLatest([this.books$, this.totalCount$]).pipe(
    map(([books, count]) => ({ books, count }))
  )


  constructor(
    private readonly booksStore: BooksStore,
    private readonly booksService: BooksService) { }

  ngOnInit(): void {

    this.booksStore.filters$.pipe(
      filter(filter => !!filter.term),
      switchMap((filters: BooksSearchFilters) => this.booksService.getBooks(filters)),

    ).subscribe(
      (res) => this.booksStore.setState(state => ({ ...state, books: res.books, totalCount: res.totalItems }))
    );

    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((term) => this.booksStore.setState(state => ({
      ...state, filters: { ...state.filters, term }
    })));

    // this.booksStore.books$.subscribe(books => this.books = books);
    // this.booksStore.totalCount$.subscribe(count => this.totalCount = count);



  }

  search(term: string) {
    this.search$.next(term);
  }

  pageChange(event: PageEvent) {
    console.log(event);
    this.booksStore.setState(state => ({
      ...state, filters: {
        ...state.filters,
        page: event.pageIndex,
        itemsPerPage: event.pageSize
      }
    }))
  }
}
