import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerraPageRoutingModule } from './terra-routing.module';

import { TerraPage } from './terra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerraPageRoutingModule
  ],
  declarations: [TerraPage]
})
export class TerraPageModule {}
