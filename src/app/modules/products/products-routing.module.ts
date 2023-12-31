import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductComponent } from './components/products-list/product/product.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'add', component: ProductComponent },
  { path: 'edit/:id', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
