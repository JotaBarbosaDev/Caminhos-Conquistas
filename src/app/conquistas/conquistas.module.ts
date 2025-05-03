import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConquistasPage } from './conquistas.page';

const routes: Routes = [
  {
    path: '',
    component: ConquistasPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ConquistasPageModule {}
