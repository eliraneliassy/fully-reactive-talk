export interface Book {
    title: string;
    previewImgUrl: string;
}

export interface BookResponse {
    totalItems: number;
    books: Book[];
}

export interface BooksSearchFilters {
    term: string;
    itemsPerPage: number;
    page: number;
  }
  
  