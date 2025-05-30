import { Component, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { ModalController, ToastController, IonContent } from "@ionic/angular";
import { AnimationController } from "@ionic/angular";

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
export class DetailModalComponent implements AfterViewInit {
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
  
  @ViewChild(IonContent) content!: IonContent;
  
  favoriteChanged: boolean = false;
  canShare: boolean = false;
  userRating: number = 0;
  
  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private animationCtrl: AnimationController
  ) {
    this.canShare = !!navigator && !!navigator.share;
  }
  
  ngOnInit() {
    if (this.favorite !== undefined) {
      this.isFavorite = this.favorite;
    }
    
    if (!this.img) {
      this.img = 'assets/images/placeholder.jpg';
    }
    else if (typeof this.img === 'string' && !this.img.startsWith('http') && !this.img.startsWith('asset')) {
      this.img = `assets/images/${this.img}`;
    }
    
    if (this.coordinates && !this.mapUrl) {
      this.mapUrl = `https://www.google.com/maps?q=${this.coordinates.lat},${this.coordinates.lng}`;
    }
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.setupParallaxEffect();
    }, 300);
  }

  private setupParallaxEffect() {
    if (this.content) {
      this.content.scrollEvents = true;
      
      this.content.ionScroll.subscribe((event: any) => {
        if (event && event.detail) {
          const scrollTop = event.detail.scrollTop;
          
          const parallaxImage = document.querySelector('.parallax-image img') as HTMLElement;
          if (parallaxImage) {
            const translateY = Math.min(-10 + (scrollTop * 0.2), 20);
            parallaxImage.style.transform = `translateY(${translateY}%)`;
          }
        }
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      favoriteChanged: this.favoriteChanged,
      userRating: this.userRating > 0 ? this.userRating : undefined
    });
  }
  
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.favorite = this.isFavorite;
    this.favoriteChanged = true;
    
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
    
    this.showToast(this.isFavorite ? 'Adicionado aos favoritos' : 'Removido dos favoritos');
    
    if (typeof this.onToggleFavorite === 'function') {
      this.onToggleFavorite();
    }
  }
  
  async shareContent() {
    if (!navigator.share) {
      this.showToast('Partilha não suportada neste navegador');
      return;
    }
    
    try {
      await navigator.share({
        title: this.title,
        text: this.description,
        url: window.location.href
      });
      this.showToast('Conteúdo partilhado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao partilhar:', error);
      if (error.name !== 'AbortError') {
        this.showToast('Não foi possível partilhar');
      }
    }
  }
  
  rateItem(rating: number) {
    this.userRating = rating;
    
    const stars = document.querySelectorAll('.rating-stars ion-icon');
    stars.forEach((star: Element, index: number) => {
      if (index < rating) {
        star.classList.add('active');
        star.setAttribute('name', 'star');
      } else {
        star.classList.remove('active');
        star.setAttribute('name', 'star-outline');
      }
    });
    
    const starsContainer = document.querySelector('.rating-stars');
    if (starsContainer) {
      const animation = this.animationCtrl.create()
        .addElement(starsContainer)
        .duration(300)
        .keyframes([
          { offset: 0, transform: 'scale(1)' },
          { offset: 0.5, transform: 'scale(1.1)' },
          { offset: 1, transform: 'scale(1)' }
        ]);
      
      animation.play();
    }
    
    this.showToast(`Avaliaste com ${rating} ${rating === 1 ? 'estrela' : 'estrelas'}!`);
  }
  
  getActionIcon(): string {
    if (!this.mainActionText) return 'information-circle-outline';
    
    if (this.mainActionText.toLowerCase().includes('mapa') || 
        this.mainActionText.toLowerCase().includes('localização')) {
      return 'map-outline';
    } else if (this.mainActionText.toLowerCase().includes('informações')) {
      return 'information-circle-outline';
    } else if (this.mainActionText.toLowerCase().includes('contacto')) {
      return 'call-outline';
    } else if (this.mainActionText.toLowerCase().includes('comprar') || 
               this.mainActionText.toLowerCase().includes('reservar')) {
      return 'cart-outline';
    } else {
      return 'arrow-forward-outline';
    }
  }
  
  onMainAction() {
    if (this.mapUrl) {
      window.open(this.mapUrl, '_blank');
    }
  }
  
  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder.jpg';
  }
  
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
