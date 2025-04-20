import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {ExplorarPage} from "./explorar.page";
import {ExplorarPageRoutingModule} from "./explorar-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExplorarPageRoutingModule],
  declarations: [ExplorarPage],
})
export class ExplorarPageModule {}
