import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const TOKENIZE_REQUEST = new HttpContextToken(() => true);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isTokenize = request.context.get(TOKENIZE_REQUEST);

    if (isTokenize) {
      request = request.clone({ headers: request.headers.set('Authorization', '123') });
    }

    return next.handle(request);
  }
}
