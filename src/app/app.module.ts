import { AuthInterceptor, TOKENIZE_REQUEST } from './auth.interceptor';
import { Observable, of } from 'rxjs';
import { BooksService } from './books.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpContext } from '@angular/common/http';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { BookResponse } from './book';
import { delay } from 'rxjs/operators';

export function app_init(httpClient: HttpClient): () => Observable<any> {
  return () => httpClient.get('https://jsonplaceholder.typicode.com/posts', {
    context: new HttpContext().set(TOKENIZE_REQUEST, false)
  }).pipe(
    
  )
}


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: app_init,
      multi: true,
      deps: [HttpClient]
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
