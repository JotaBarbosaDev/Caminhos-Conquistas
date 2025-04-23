import { Component, Input } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { AnimationController } from "@ionic/angular";

// Interface para informações extras exibidas no modal
export interface ExtraInfo {
  icon: string;
  label: string;
  value: string;
}

@Component({
  selector: "app-detail-modal",
  templateUrl: "./detail-modal.component.html",
  styleUrls: ["./detail-modal.component.scss"],
  standalone: false
})
export class DetailModalComponent {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() img: string = '';
  @Input() subtitle: string = '';
  @Input() description: string = '';
  @Input() location: string = '';
  @Input() coordinates: { lat: number, lng: number } | null = null;
  @Input() mapUrl: string = '';
  @Input() isFavorite: boolean = false;
  @Input() favorite: boolean = false;
  @Input() extraInfo: ExtraInfo[] = [];
  @Input() mainActionText: string = '';
  @Input() onToggleFavorite: Function = () => {};
  
  favoriteChanged: boolean = false;
  canShare: boolean = false;
  
  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private animationCtrl: AnimationController
  ) {
    // Verificar se a API de compartilhamento está disponível
    this.canShare = !!navigator && !!navigator.share;
  }
  
  ngOnInit() {
    // Inicializar estados
    if (this.favorite !== undefined) {
      this.isFavorite = this.favorite;
    }
    
    // Gerar URL do mapa se temos coordenadas mas não temos URL definida
    if (this.coordinates && !this.mapUrl) {
      this.mapUrl = `https://www.google.com/maps?q=${this.coordinates.lat},${this.coordinates.lng}`;
    }
  }

  // Fechar o modal
  dismiss() {
    this.modalCtrl.dismiss({
      favoriteChanged: this.favoriteChanged
    });
  }
  
  // Alternar estado de favorito
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.favorite = this.isFavorite;
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
    
    // Mostrar feedback ao usuário
    this.showToast(this.isFavorite ? 'Adicionado aos favoritos' : 'Removido dos favoritos');
    
    // Chamar função do componente pai
    if (typeof this.onToggleFavorite === 'function') {
      this.onToggleFavorite();
    }
  }
  
  // Compartilhar conteúdo
  async shareContent() {
    if (!navigator.share) {
      this.showToast('Compartilhamento não suportado neste navegador');
      return;
    }
    
    try {
      await navigator.share({
        title: this.title,
        text: this.description,
        url: window.location.href
      });
      this.showToast('Conteúdo compartilhado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao compartilhar:', error);
      // Usuário cancelou o compartilhamento - não exibir erro
      if (error.name !== 'AbortError') {
        this.showToast('Não foi possível compartilhar');
      }
    }
  }
  
  // Ação principal
  onMainAction() {
    if (this.mapUrl) {
      window.open(this.mapUrl, '_blank');
    }
  }
  
  // Tratar erro ao carregar imagem
  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder.jpg';
  }
  
  // Exibir toast para feedback
  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'primary',
      buttons: [
        {
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });
    
    await toast.present();
  }
}
