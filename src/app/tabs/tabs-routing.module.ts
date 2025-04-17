// src/app/tabs/tabs-routing.module.ts
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TabsPage} from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "gostos",
        loadChildren: () =>
          import("../gostos/gostos.module").then((m) => m.GostosModule), // Corrigido
      },
      {
        path: "conquistas",
        loadChildren: () =>
          import("../conquistas/conquistas.module").then(
            (m) => m.ConquistasPageModule
          ),
      },
      {
        path: "perfil",
        loadChildren: () =>
          import("../perfil/perfil.module").then((m) => m.PerfilPageModule),
      },
      {
        path: "terra",
        loadChildren: () =>
          import("../terra/terra.module").then((m) => m.TerraPageModule),
      },
      {
        path: "explorar",
        loadChildren: () =>
          import("../explorar/explorar.module").then(
            (m) => m.ExplorarPageModule
          ),
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
