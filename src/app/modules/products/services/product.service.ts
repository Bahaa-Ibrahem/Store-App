import { Injectable } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getAllProducts() {
    return fetch('https://fakestoreapi.com/products');
  }

  getProductById(id: number) {
    return fetch(`https://fakestoreapi.com/products/${id}`);
  }

  addProduct(body: Product) {
    return fetch('https://fakestoreapi.com/products',{
      method:"POST",
      body:JSON.stringify(
       body
      )
    })
  }

  editProduct(id: number, body: Product) {
    return fetch(`https://fakestoreapi.com/products/${id}`,{
      method:"PUT",
      body:JSON.stringify(
       body
      )
   })
  }

  deleteProduct(id: number) {
    return fetch(`https://fakestoreapi.com/products/${id}`,{
      method:"DELETE"
    });
  }
}
