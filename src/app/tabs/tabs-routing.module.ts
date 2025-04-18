import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TabsPage} from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "perfil",
        loadChildren: () =>
          import("../perfil/perfil.module").then((m) => m.PerfilPageModule),
      },
      {
        path: "gostos",
        loadChildren: () =>
          import("../gostos/gostos.module").then((m) => m.GostosPageModule),
      },
      {
        path: "conquistas",
        loadChildren: () =>
          import("../conquistas/conquistas.module").then(
            (m) => m.ConquistasPageModule
          ),
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
      {path: "", redirectTo: "perfil", pathMatch: "full"},
    ],
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class TabsPageRoutingModule {}
