import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {TabsPageRoutingModule} from "./tabs-routing.module";
import {TabsPage} from "./tabs.page";

@NgModule({
  imports: [CommonModule, IonicModule, TabsPageRoutingModule],
  declarations: [TabsPage],
})
export class TabsPageModule {}
