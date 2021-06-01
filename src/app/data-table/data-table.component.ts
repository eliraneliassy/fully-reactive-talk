import { Book } from './../book';
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],

})
export class DataTableComponent {
  private _data: Book[] = [];
  @Input() set data(val: Book[]) {
    this._data = val;

    this.dataSource = new MatTableDataSource<Book>(val);
  }
  get data() {
    return this._data;
  }

  @Input() totalCount: number = 0;

  @Output() pageChange = new EventEmitter<PageEvent>();
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>([]);

  displayedColumns: string[] = ['position', 'previewImgUrl', 'title'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  page(p: PageEvent) {
    this.pageChange.emit(p);
  }

}
