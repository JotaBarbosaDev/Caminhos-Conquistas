import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FavoriteItem {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  description: string;
  source: string; // 'terra', 'gostos', etc.
  category?: string; // 'convivio', 'gastronomia', 'desporto', etc.
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

  // Carrega todos os favoritos de diferentes fontes
  private loadAllFavorites() {
    // Carrega favoritos da Terra
    this.loadTerraFavorites();
    
    // Carrega favoritos da página Gostos
    this.loadGostosFavorites();
    
    // Atualiza o subject
    this.favoritesSubject.next(this.favorites);
  }

  // Carregar favoritos da página Terra
  private loadTerraFavorites() {
    try {
      const saved = localStorage.getItem('terra-favorites');
      if (saved) {
        const terraFavs = JSON.parse(saved);
        
        // Converter para o formato padrão de FavoriteItem
        terraFavs.forEach((fav: {id: string, title: string}) => {
          // Verificar se já existe para evitar duplicatas
          if (!this.favorites.some(item => item.id === fav.id && item.source === 'terra')) {
            this.favorites.push({
              id: fav.id,
              title: fav.title,
              subtitle: 'Ponto de interesse',
              img: '', // Será preenchido quando utilizado
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

  // Carregar favoritos da página Gostos
  private loadGostosFavorites() {
    try {
      const saved = localStorage.getItem('gostosFavorites');
      if (saved) {
        const gostosFavs = JSON.parse(saved);
        
        // Processar favoritos de convívio
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
        
        // Processar favoritos de gastronomia
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
        
        // Processar favoritos de desporto
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

  // Método para obter todos os favoritos
  getAllFavorites(): FavoriteItem[] {
    return this.favorites;
  }

  // Método para verificar se um item é favorito
  isFavorite(id: string, source: string): boolean {
    return this.favorites.some(item => (item.id === id || item.title === id) && item.source === source);
  }

  // Método para adicionar um favorito
  addFavorite(item: FavoriteItem) {
    if (!this.isFavorite(item.id, item.source)) {
      this.favorites.push(item);
      this.favoritesSubject.next(this.favorites);
      this.saveToLocalStorage(item.source);
    }
  }

  // Método para remover um favorito
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

  // Método para salvar em localStorage com base na fonte
  private saveToLocalStorage(source: string) {
    if (source === 'terra') {
      const terraFavs = this.favorites
        .filter(item => item.source === 'terra')
        .map(item => ({ id: item.id, title: item.title }));
      
      localStorage.setItem('terra-favorites', JSON.stringify(terraFavs));
    } 
    else if (source === 'gostos') {
      // Formato do gostos
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

  // Método para sincronizar informações detalhadas do item
  updateFavoriteDetails(items: any[], source: string) {
    const updatedFavorites = [...this.favorites];
    
    // Para cada item favorito da fonte especificada
    updatedFavorites
      .filter(fav => fav.source === source)
      .forEach(fav => {
        // Encontrar o item correspondente nos itens fornecidos
        const fullItem = items.find(item => 
          item.id === fav.id || item.title === fav.title
        );
        
        if (fullItem) {
          // Atualizar detalhes
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

  // Recarrega todos os favoritos
  refreshFavorites() {
    this.favorites = [];
    this.loadAllFavorites();
  }
}