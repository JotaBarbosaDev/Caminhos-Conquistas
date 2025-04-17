import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerraPage } from './terra.page';

const routes: Routes = [
  {
    path: '',
    component: TerraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerraPageRoutingModule {}
