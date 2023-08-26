import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CateogryService {

  constructor() { }

  getAllCategories() {
    return fetch('https://fakestoreapi.com/products/categories');
  }

  getProductsInCategories(category: string) {
    return fetch(`https://fakestoreapi.com/products/category/${category}`);
  }
}
