import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {ConquistasPage} from "./conquistas.page";
import {ConquistasPageRoutingModule} from "./conquistas-routing.module";

@NgModule({
  imports: [CommonModule, IonicModule, ConquistasPageRoutingModule],
  declarations: [ConquistasPage],
})
export class ConquistasPageModule {}
