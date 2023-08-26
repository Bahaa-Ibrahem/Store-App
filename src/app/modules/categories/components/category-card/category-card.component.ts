import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() product: Product;
}
