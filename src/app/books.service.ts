import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BooksSearchFilters, BookResponse } from './book';
import { map, reduce, tap } from 'rxjs/operators';
import { TOKENIZE_REQUEST } from './auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private readonly httpClient: HttpClient) { }

  getBooks(filers: BooksSearchFilters): Observable<BookResponse> {
    return this.httpClient
      .get<any>(`https://www.googleapis.com/books/v1/volumes?q=${filers.term}&maxResults=${filers.itemsPerPage}&startIndex=${filers.page * filers.itemsPerPage}`,
      {context: new HttpContext().set(TOKENIZE_REQUEST, false)})
      .pipe(
        map((res: any) => ({
          totalItems: res.totalItems,
          books: res.items.map((item: any) => item.volumeInfo).map(
            (book: any) => ({ title: book.title, previewImgUrl: book.imageLinks.thumbnail })
          )
        })),
      );
  }
}
