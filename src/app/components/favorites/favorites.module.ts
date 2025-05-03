import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FavoritesComponent } from './favorites.component';
import { HeaderWithFavoritesComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    // Importar componentes standalone em vez de declará-los
    FavoritesComponent,
    HeaderWithFavoritesComponent
  ],
  exports: [
    // Exportar os componentes standalone
    FavoritesComponent,
    HeaderWithFavoritesComponent
  ]
})
export class FavoritesModule { }