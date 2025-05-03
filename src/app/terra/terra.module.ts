import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerraPage } from './terra.page';

const routes: Routes = [
  {
    path: '',
    component: TerraPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TerraPageModule {}
