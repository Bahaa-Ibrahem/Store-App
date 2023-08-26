import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  productForm: FormGroup;
  product: Product;

  id: number;
  editMode: boolean = false;

  constructor(route: ActivatedRoute, private router: Router, private productService: ProductService) {
    route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if(this.id) {
        this.editMode = true;
        this.getProductById();
      }
    })
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    })
  }

  getProductById() {
    this.productService.getProductById(this.id)
    .then((res: any) => res.json())
    .then((json: Product) => {
      this.product = json;
      this.productForm.patchValue(this.product);
    })
  }

  onSubmit() {
    console.log(this.productForm.value);
    if(this.productForm.valid) {
      if(this.editMode) {
        this.productService.editProduct(this.id, this.productForm.value)
        .then(res => res.json())
        .then(json => {
          this.router.navigate(['/products']);
        })
      } else {
        this.productService.addProduct(this.productForm.value)
        .then(res => res.json())
        .then(json => {
          this.router.navigate(['/products']);
        })
      }
    } else {
      return;
    }
  }
}
