import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-with-favorites',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar [color]="color" class="header-toolbar">
        <ion-buttons slot="start">
          <ion-back-button *ngIf="showBackButton" [defaultHref]="backHref" text="Voltar" [attr.tabindex]="isHidden ? -1 : 0"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="onToggleFavorites()" [attr.tabindex]="isHidden ? -1 : 0">
            <ion-icon [name]="showingFavorites ? 'heart' : 'heart-outline'"></ion-icon>
          </ion-button>
          <ng-content select="[buttons-end]"></ng-content>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HeaderWithFavoritesComponent {
  @Input() title: string = 'Título';
  @Input() color: string = 'primary';
  @Input() showBackButton: boolean = true;
  @Input() backHref: string = '/tabs/perfil';
  @Input() showingFavorites: boolean = false;
  @Input() onToggleFavorites: () => void = () => {};
  @Input() isHidden: boolean = false;
}
