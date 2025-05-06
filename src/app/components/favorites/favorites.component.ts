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
  
  showFavorites: boolean = true;
  favoriteItems: FavoriteItem[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private toastController: ToastController,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavorites();

    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoriteItems = favorites;
    });
  }

  loadFavorites() {
    this.favoriteItems = this.favoritesService.getAllFavorites();
  }

  toggleFavorites() {
    this.router.navigate(['/tabs/terra']);
  }

  async openDetails(item: FavoriteItem) {
    const mapUrl = item.coordinates ? 
      `https://www.google.com/maps?q=${item.coordinates.lat},${item.coordinates.lng}` : 
      '';
    
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

    if (item.location) {
      extraInfo.push({
        icon: 'location-outline',
        label: 'Local',
        value: item.location
      });
    }

    if (item.category) {
      extraInfo.push({
        icon: 'pricetag-outline',
        label: 'Categoria',
        value: this.getCategoryLabel(item.category)
      });
    }

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
    
    if (data && data.favoriteChanged) {
      this.toggleItemFavorite(item);
    }
  }

  toggleItemFavorite(item: FavoriteItem) {
    this.favoritesService.removeFavorite(item.id, item.source);
    this.presentToast(`${item.title} removido dos favoritos`);
  }

  getSourceLabel(source: string): string {
    switch (source) {
      case 'terra': return 'A Minha Terra';
      case 'gostos': return 'Os Meus Gostos';
      case 'explorar': return 'Explorar';
      default: return source;
    }
  }

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
