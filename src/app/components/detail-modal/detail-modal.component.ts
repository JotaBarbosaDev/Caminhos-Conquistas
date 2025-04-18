import {Component, Input} from "@angular/core";
import {ModalController} from "@ionic/angular";

@Component({
  selector: "app-detail-modal",
  standalone: false,
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Fechar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <img
        [src]="img"
        style="width:100%;height:auto;object-fit:cover;margin-bottom:12px;"
      />
      <p>{{ description }}</p>
    </ion-content>
  `,
})
export class DetailModalComponent {
  @Input() title!: string;
  @Input() img!: string;
  @Input() description!: string;

  constructor(private modalCtrl: ModalController) {}
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
