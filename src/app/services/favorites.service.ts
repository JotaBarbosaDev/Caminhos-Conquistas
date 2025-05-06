import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FavoriteItem {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  description: string;
  source: string;
  category?: string;
  location?: string;
  coordinates?: { lat: number, lng: number };
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: FavoriteItem[] = [];
  private favoritesSubject = new BehaviorSubject<FavoriteItem[]>([]);
  
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadAllFavorites();
  }

  private loadAllFavorites() {
    this.loadTerraFavorites();
    this.loadGostosFavorites();
    this.favoritesSubject.next(this.favorites);
  }

  private loadTerraFavorites() {
    try {
      const saved = localStorage.getItem('terra-favorites');
      if (saved) {
        const terraFavs = JSON.parse(saved);
        
        terraFavs.forEach((fav: {id: string, title: string}) => {
          if (!this.favorites.some(item => item.id === fav.id && item.source === 'terra')) {
            this.favorites.push({
              id: fav.id,
              title: fav.title,
              subtitle: 'Ponto de interesse',
              img: '',
              description: '',
              source: 'terra'
            });
          }
        });
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos da Terra:', e);
    }
  }

  private loadGostosFavorites() {
    try {
      const saved = localStorage.getItem('gostosFavorites');
      if (saved) {
        const gostosFavs = JSON.parse(saved);
        
        if (gostosFavs.convivio) {
          gostosFavs.convivio.forEach((fav: {title: string, favorite: boolean}) => {
            if (fav.favorite && !this.favorites.some(item => item.title === fav.title && item.source === 'gostos')) {
              this.favorites.push({
                id: fav.title,
                title: fav.title,
                subtitle: 'Convívio',
                img: '',
                description: '',
                source: 'gostos',
                category: 'convivio'
              });
            }
          });
        }
        
        if (gostosFavs.gastronomia) {
          gostosFavs.gastronomia.forEach((fav: {title: string, favorite: boolean}) => {
            if (fav.favorite && !this.favorites.some(item => item.title === fav.title && item.source === 'gostos')) {
              this.favorites.push({
                id: fav.title,
                title: fav.title,
                subtitle: 'Gastronomia',
                img: '',
                description: '',
                source: 'gostos',
                category: 'gastronomia'
              });
            }
          });
        }
        
        if (gostosFavs.desporto) {
          gostosFavs.desporto.forEach((fav: {title: string, favorite: boolean}) => {
            if (fav.favorite && !this.favorites.some(item => item.title === fav.title && item.source === 'gostos')) {
              this.favorites.push({
                id: fav.title,
                title: fav.title,
                subtitle: 'Desporto',
                img: '',
                description: '',
                source: 'gostos',
                category: 'desporto'
              });
            }
          });
        }
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos de Gostos:', e);
    }
  }

  getAllFavorites(): FavoriteItem[] {
    return this.favorites;
  }

  isFavorite(id: string, source: string): boolean {
    return this.favorites.some(item => (item.id === id || item.title === id) && item.source === source);
  }

  addFavorite(item: FavoriteItem) {
    if (!this.isFavorite(item.id, item.source)) {
      this.favorites.push(item);
      this.favoritesSubject.next(this.favorites);
      this.saveToLocalStorage(item.source);
    }
  }

  removeFavorite(id: string, source: string) {
    const index = this.favorites.findIndex(item => 
      (item.id === id || item.title === id) && item.source === source
    );
    
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.favoritesSubject.next(this.favorites);
      this.saveToLocalStorage(source);
    }
  }

  private saveToLocalStorage(source: string) {
    if (source === 'terra') {
      const terraFavs = this.favorites
        .filter(item => item.source === 'terra')
        .map(item => ({ id: item.id, title: item.title }));
      
      localStorage.setItem('terra-favorites', JSON.stringify(terraFavs));
    } 
    else if (source === 'gostos') {
      const convivio = this.favorites
        .filter(item => item.source === 'gostos' && item.category === 'convivio')
        .map(item => ({ title: item.title, favorite: true }));
      
      const gastronomia = this.favorites
        .filter(item => item.source === 'gostos' && item.category === 'gastronomia')
        .map(item => ({ title: item.title, favorite: true }));
      
      const desporto = this.favorites
        .filter(item => item.source === 'gostos' && item.category === 'desporto')
        .map(item => ({ title: item.title, favorite: true }));
      
      localStorage.setItem('gostosFavorites', JSON.stringify({
        convivio,
        gastronomia,
        desporto
      }));
    }
  }

  updateFavoriteDetails(items: any[], source: string) {
    const updatedFavorites = [...this.favorites];
    
    updatedFavorites
      .filter(fav => fav.source === source)
      .forEach(fav => {
        const fullItem = items.find(item => 
          item.id === fav.id || item.title === fav.title
        );
        
        if (fullItem) {
          fav.img = fullItem.img || fav.img;
          fav.description = fullItem.description || fav.description;
          fav.subtitle = fullItem.subtitle || fav.subtitle;
          fav.location = fullItem.location || fav.location;
          fav.coordinates = fullItem.coordinates || fav.coordinates;
        }
      });
    
    this.favorites = updatedFavorites;
    this.favoritesSubject.next(this.favorites);
  }

  refreshFavorites() {
    this.favorites = [];
    this.loadAllFavorites();
  }
}
