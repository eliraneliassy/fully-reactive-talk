import { TestBed } from '@angular/core/testing';

import { BooksStoreService } from './books-store.service';

describe('BooksStoreService', () => {
  let service: BooksStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
