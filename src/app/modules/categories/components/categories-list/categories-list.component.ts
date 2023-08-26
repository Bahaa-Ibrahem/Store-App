import { Component } from '@angular/core';
import { CateogryService } from '../../services/cateogry.service';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
  constructor(private catService: CateogryService) { }
  categories: string[] = [];
  products: Product[] = [];

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.catService.getAllCategories()
    .then(res => res.json())
    .then(json => this.categories = json);
  }

  getProductInCategory(category: string) {
    this.catService.getProductsInCategories(category)
    .then(res => res.json())
    .then(json => this.products = json);
  }

  onChangeCategory(event: any) {
    this.getProductInCategory(event);
  }
}
