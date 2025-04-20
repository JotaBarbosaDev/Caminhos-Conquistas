import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {ConquistasPage} from "./conquistas.page";
import {ConquistasPageRoutingModule} from "./conquistas-routing.module";

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    ConquistasPageRoutingModule
  ],
  declarations: [ConquistasPage],
})
export class ConquistasPageModule {}
