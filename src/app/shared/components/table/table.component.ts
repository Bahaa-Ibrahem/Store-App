import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Table } from 'src/app/core/interfaces/table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);

  totalRows = 0;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @Input() isPagination: boolean = true;
  @Input() pageSize = 5;
  @Input() columns: Table[] = [];
  @Input() rows: any[] = [];
  @Input() withIndex: boolean = false;
  @Input() isCustomClass: boolean = false;
  @Input() withCheckbox: boolean = false;
  @Input() spacing: boolean = false;
  @Input() bg_white: boolean = false;
  @Input() totalCount: number = 0;;

  @Output() action = new EventEmitter();
  @Output() selected = new EventEmitter();
  @Output() rowId = new EventEmitter();
  @Output() pageChanged = new EventEmitter<{pageIndex: number, pageSize:number}>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {}


  ngOnChanges() {
    setTimeout(() => {
      this.paginator.length = this.totalCount;
    });
  }

  ngAfterContentInit() {
    let displayedColumns: string[] = [];
    this.columns.map((column) => {
      displayedColumns.push(column.rowPropertyName);
    });

    this.displayedColumns = displayedColumns;
  }

  pageChangedFun(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageChanged.emit({pageIndex: this.currentPage, pageSize: this.pageSize});
  }

  doAction(row: any, actionType: string | undefined) {
    const action = { actionType, row };
    this.action.emit(action);
  }

}
