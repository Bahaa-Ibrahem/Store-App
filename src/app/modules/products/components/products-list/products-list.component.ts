import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Actions } from 'src/app/core/enums/actions/actions';
import { Columns } from 'src/app/core/interfaces/table.interface';
import { ProductService } from '../../services/product.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  pageInfo = {
    pageNum: 0,
    pageSize: 5
  }

  totalCount: number = 0;
  columns!: Columns[];

  rows: {
    id: number,
    description: string,
    category: string,
    price: string,
    title: string,
    image: string,
    rating: {count: number, rate: number}}[] = [];

  constructor(private router: Router, private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.generateColumns();
  }

  getAllProducts() {
    this.productService.getAllProducts()
    .then(res => res.json())
    .then(json => {
      this.rows = json.slice(this.pageInfo.pageNum * this.pageInfo.pageSize, (this.pageInfo.pageNum * this.pageInfo.pageSize) + this.pageInfo.pageSize);
      this.totalCount = json.length;
    })

  }

  generateColumns() {
    this.columns = [
      {
        title: 'ID',
        rowPropertyName: 'id',
        className: 'x-small',
        type: 'data',
        classColor: 'text-dark'
      },
      {
        title: 'Description',
        rowPropertyName: 'description',
        className: 'x-large',
        type: 'data',
        classColor: 'text-dark'
      },
      {
        title: 'Category',
        rowPropertyName: 'category',
        className: 'small',
        type: 'data',
        classColor: 'text-dark'
      },
      {
        title: 'Title',
        rowPropertyName: 'title',
        className: 'large',
        type: 'data',
        classColor: 'text-dark'
      },
      {
        title: 'Price',
        rowPropertyName: 'price',
        className: 'small',
        type: 'data',
        classColor: 'text-dark'
      },
      {
        title: 'Image',
        rowPropertyName: 'image',
        className: 'small',
        type: 'image',
        classColor: 'text-dark'
      },
      {
        title: '',
        rowPropertyName: 'actions',
        actionIconsName: [{iconName: 'edit', actionName: 'Edit', actionType: Actions.EDIT}, {iconName: 'delete', actionName: 'Delete', actionType: Actions.DELETE}],
        className: 'small',
        type: 'actions',
        actionType: 'icon',
        classColor: 'text-dark'
      }
    ];
  }

  onAction(action: any) {
    if(action.actionType == Actions.EDIT) {
      this.router.navigate([`/products/edit/${action.row.id}`]);
    } else if(action.actionType == Actions.DELETE) {
      this.deleteProduct(action.row.id);
    }
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { id: id, confirmText: "Delete", msg: "Are you sure you want delete this Product" },
      panelClass: 'sm'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delete(id);
      }
    });
  }

  delete(id: number) {
    this.productService.deleteProduct(id)
    .then(res => res.json())
    .then(json => {
      this.getAllProducts();
    });
  }

  onPageChanged(event: any) {
    this.pageInfo = {
      pageNum: event.pageIndex,
      pageSize: event.pageSize
    }

    this.getAllProducts();
  }
}
