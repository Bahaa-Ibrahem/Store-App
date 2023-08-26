import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Actions } from 'src/app/core/enums/actions/actions';
import { Columns } from 'src/app/core/interfaces/table.interface';
import { ProductService } from '../../services/product.service';

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

  constructor(private router: Router, private productService: ProductService) {}

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
    if(action.actionType == Actions.VIEW_EDIT) {
      this.router.navigate([`/asset/view/${action.row.assetNumber}`], { queryParams: { page: 'registration' } });
    }
   }

  onPageChanged(event: any) {
    console.log(event)
    this.pageInfo = {
      pageNum: event.pageIndex,
      pageSize: event.pageSize
    }

    this.getAllProducts();
  }
}
