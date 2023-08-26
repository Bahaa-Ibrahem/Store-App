import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/gaurds/auth/auth.guard';
import { AdminGuard } from './core/gaurds/auth/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/catogries', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },

      {
        path: 'catogries',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule)
      },

      {
        path: 'products',
        canActivate: [AuthGuard, AdminGuard],
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
      }
    ]
  },
  {
    path: 'error',
    loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
  },
  { path: '**', redirectTo: '/error/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
