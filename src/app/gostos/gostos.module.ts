import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {GostosRoutingModule} from "./gostos-routing.module";
import {GostosPage} from "./gostos.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GostosRoutingModule],
  declarations: [GostosPage],
})
export class GostosPageModule {}
