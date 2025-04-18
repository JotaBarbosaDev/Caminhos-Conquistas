import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {TerraPage} from "./terra.page";
import {TerraPageRoutingModule} from "./terra-routing.module";

@NgModule({
  imports: [CommonModule, IonicModule, TerraPageRoutingModule],
  declarations: [TerraPage],
})
export class TerraPageModule {}
