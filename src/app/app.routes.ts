import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'edit-image/:id',
    loadComponent: () => import('./pages/edit-image/edit-image.page').then( m => m.EditImagePage)
  },
];
