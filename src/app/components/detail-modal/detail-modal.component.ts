import {Component, Input} from "@angular/core";
import {ModalController} from "@ionic/angular";
import {AnimationController} from "@ionic/angular";

@Component({
  selector: "app-detail-modal",
  standalone: false,
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="toggleFavorite()" class="favorite-btn">
            <ion-icon [name]="favorite ? 'heart' : 'heart-outline'" 
                      [class.favorited]="favorite"></ion-icon>
          </ion-button>
          <ion-button (click)="dismiss()">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="image-container">
        <img [src]="img" alt="{{ title }}" class="detail-image"/>
      </div>
      
      <h2 class="section-title ion-margin-top">Descrição</h2>
      <p class="description">{{ description }}</p>
      
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button expand="block" (click)="dismiss()" class="close-button">
              <ion-icon name="arrow-back-outline" slot="start"></ion-icon>
              Voltar
            </ion-button>
          </ion-col>
          <ion-col *ngIf="hasShareButton">
            <ion-button expand="block" (click)="shareItem()" color="tertiary">
              <ion-icon name="share-social-outline" slot="start"></ion-icon>
              Compartilhar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [`
    .detail-image {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .image-container {
      position: relative;
      margin-bottom: 16px;
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--ion-color-dark);
      margin-bottom: 8px;
    }
    
    .description {
      font-size: 16px;
      line-height: 1.6;
      color: var(--ion-color-medium-shade);
      margin-bottom: 24px;
    }
    
    .favorite-btn ion-icon {
      font-size: 24px;
      transition: all 0.3s ease;
    }
    
    .favorite-btn .favorited {
      color: #ff5b71;
      transform: scale(1.2);
    }
    
    .close-button {
      margin-top: 16px;
    }
  `]
})
export class DetailModalComponent {
  @Input() title!: string;
  @Input() img!: string;
  @Input() description!: string;
  @Input() favorite: boolean = false;
  @Input() onToggleFavorite: Function = () => {};
  
  hasShareButton: boolean = false;
  favoriteChanged: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController
  ) {
    // Verificar se está em um ambiente que suporta compartilhamento
    this.hasShareButton = !!navigator.share;
  }
  
  dismiss() {
    this.modalCtrl.dismiss({
      favoriteChanged: this.favoriteChanged
    });
  }
  
  toggleFavorite() {
    this.favorite = !this.favorite;
    this.favoriteChanged = true;
    
    // Efeito de animação no ícone
    const favoriteIcon = document.querySelector('.favorite-btn ion-icon');
    if (favoriteIcon) {
      const animation = this.animationCtrl.create()
        .addElement(favoriteIcon)
        .duration(300)
        .keyframes([
          { offset: 0, transform: 'scale(1)' },
          { offset: 0.5, transform: 'scale(1.3)' },
          { offset: 1, transform: 'scale(1)' }
        ]);
      
      animation.play();
    }
    
    // Chamar função do componente pai
    if (typeof this.onToggleFavorite === 'function') {
      this.onToggleFavorite();
    }
  }
  
  async shareItem() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: this.title,
          text: this.description,
          url: window.location.href
        });
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    }
  }
}
