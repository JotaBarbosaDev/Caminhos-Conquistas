import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ToastController, IonicModule } from '@ionic/angular';
import { FavoritesService, FavoriteItem } from '../../services/favorites.service';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FavoritesComponent implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  
  showFavorites: boolean = true; // Definido como true por padrão
  favoriteItems: FavoriteItem[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private toastController: ToastController,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavorites();

    // Inscrever para atualizações de favoritos
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoriteItems = favorites;
    });
  }

  loadFavorites() {
    this.favoriteItems = this.favoritesService.getAllFavorites();
  }

  toggleFavorites() {
    // Se estiver na página de favoritos, navega de volta para a página anterior
    this.router.navigate(['/tabs/terra']);
  }

  async openDetails(item: FavoriteItem) {
    // Obter mapUrl para itens com coordenadas
    const mapUrl = item.coordinates ? 
      `https://www.google.com/maps?q=${item.coordinates.lat},${item.coordinates.lng}` : 
      '';
    
    // Informações extras baseadas no tipo de fonte
    let extraInfo = [
      {
        icon: 'bookmark-outline',
        label: 'Origem',
        value: this.getSourceLabel(item.source)
      },
      {
        icon: 'information-circle-outline',
        label: 'Tipo',
        value: item.subtitle || 'Item favorito'
      }
    ];

    // Adicionar localização se disponível
    if (item.location) {
      extraInfo.push({
        icon: 'location-outline',
        label: 'Local',
        value: item.location
      });
    }

    // Adicionar categoria se disponível
    if (item.category) {
      extraInfo.push({
        icon: 'pricetag-outline',
        label: 'Categoria',
        value: this.getCategoryLabel(item.category)
      });
    }

    // Usar o serviço de modal para abrir o modal de detalhes
    const { data } = await this.modalService.openDetailModal({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      img: item.img,
      description: item.description,
      location: item.location,
      coordinates: item.coordinates,
      mapUrl: mapUrl,
      extraInfo: extraInfo,
      mainActionText: mapUrl ? 'Ver no mapa' : undefined,
      actionUrl: mapUrl,
      isFavorite: true,
      favorite: true,
      onToggleFavorite: () => this.toggleItemFavorite(item)
    });
    
    // Processar dados quando o modal fechar
    if (data && data.favoriteChanged) {
      this.toggleItemFavorite(item);
    }
  }

  // Função para alternar o estado de favorito de um item
  toggleItemFavorite(item: FavoriteItem) {
    this.favoritesService.removeFavorite(item.id, item.source);
    this.presentToast(`${item.title} removido dos favoritos`);
  }

  // Obter rótulo legível para a fonte
  getSourceLabel(source: string): string {
    switch (source) {
      case 'terra': return 'Minha Terra';
      case 'gostos': return 'Meus Gostos';
      case 'explorar': return 'Explorar';
      default: return source;
    }
  }

  // Obter rótulo legível para a categoria
  getCategoryLabel(category: string): string {
    switch (category) {
      case 'convivio': return 'Convívio';
      case 'gastronomia': return 'Gastronomia';
      case 'desporto': return 'Desporto';
      case 'cultural': return 'Cultural';
      default: return category;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
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