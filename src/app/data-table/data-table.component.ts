import { Book } from './../book';
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {
  private _data: Book[] = [];
  @Input() set data(d: Book[]) {
    this._data = d;
    this.dataSource = new MatTableDataSource<Book>(this._data);
  }
  get data() {
    return this._data;
  }

  @Input() totalCount: number = 0;

  @Output() pageChange = new EventEmitter<PageEvent>();
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>([]);

  displayedColumns: string[] = ['position', 'previewImgUrl', 'title'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  page(p: PageEvent) {
    this.pageChange.emit(p);
  }

  fibo(n: number): number {
    if (n === 1 || n === 2) return 1;
    return this.fibo(n - 1) + this.fibo(n - 2);
  }

}
