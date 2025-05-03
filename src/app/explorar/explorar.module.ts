import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorarPage } from './explorar.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorarPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ExplorarPageModule {}
