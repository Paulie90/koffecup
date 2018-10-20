import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImagesComponent } from './images/images.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/images' },
  {
    path: 'images',
    pathMatch: 'full',
    component: ImagesComponent
  },
  {
    path: 'images/:offset/:limit',
    pathMatch: 'full',
    component: ImagesComponent
  },
  { path: '**', redirectTo: '/images' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
