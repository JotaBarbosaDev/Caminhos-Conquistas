import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GostosPage} from "./gostos.page";

const routes: Routes = [
  {
    path: "",
    component: GostosPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GostosRoutingModule {}
