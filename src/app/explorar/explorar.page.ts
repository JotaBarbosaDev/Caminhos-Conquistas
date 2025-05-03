import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, RefresherCustomEvent, ToastController, IonicModule } from '@ionic/angular';
import { ModalService } from '../services/modal.service';
import { FavoritesService } from '../services/favorites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { HeaderWithFavoritesComponent } from '../components/favorites/header.component';

interface Event {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  img: string;
  date: string;
  location: string;
  category: string;
  price?: string;
  link?: string;
  coordinates?: { lat: number, lng: number };
}

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule, 
    FormsModule,
    FavoritesComponent,
    HeaderWithFavoritesComponent
  ]
})
export class ExplorarPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  events: Event[] = [
    {
      title: "Romaria da Agonia",
      location: "Viana do Castelo",
      date: "Agosto",
      img: "../../assets/images/romariaagonia.jpg",
      description:
        "A Romaria da Agonia é uma festa religiosa que celebra a devoção à Nossa Senhora da Agonia, com procissões, danças e trajes típicos. É um evento vibrante que atrai visitantes de todo o país.",
      category: "cultural"
    },
    {
      title: "Feiras Novas",
      location: "Ponte de Lima",
      date: "Setembro",
      img: "../../assets/images/feirasnovas.jpg",
      description:
        "As Feiras Novas são uma celebração popular que inclui música, danças e gastronomia local. É uma oportunidade para experimentar a cultura e tradições da região.",
      category: "gastronomia"
    },
    {
      title: "Caminho de Santiago",
      location: "Freixo",
      date: "Todo o ano",
      img: "../../assets/images/caminhostiago.jpeg",
      description:
        "O Caminho de Santiago é uma rota histórica que leva os peregrinos a Santiago de Compostela. Atravessa paisagens deslumbrantes e locais históricos, oferecendo uma experiência espiritual e cultural.",
      category: "desporto"
    },
    {
      title: "Museu do Traje",
      location: "Ponte de Lima",
      date: "Diariamente",
      img: "../../assets/images/museutraje.jpg",
      description:
        "O Museu do Traje apresenta a rica herança cultural da região através de trajes tradicionais. As exposições oferecem uma visão fascinante da história e costumes locais.",
      category: "cultural"
    },
  ];

  // Nova propriedade para armazenar eventos filtrados
  filteredEvents: Event[] = [];

  viewType: 'grid' | 'list' = 'grid';
  selectedCategory: 'all' | 'cultural' | 'desporto' | 'gastronomia' = 'all';
  searchTerm: string = '';
  showFavorites: boolean = false;

  constructor(
    private modalService: ModalService,
    private toastController: ToastController,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.filterEvents();
    this.syncFavoritesDetails();
  }

  toggleView() {
    this.viewType = this.viewType === 'grid' ? 'list' : 'grid';
  }

  filterEvents() {
    // Em vez de modificar o array original, criamos um novo array filtrado
    this.filteredEvents = this.events.filter(event => {
      const matchesSearch = !this.searchTerm || 
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = this.selectedCategory === 'all' || 
        event.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.filterEvents();
  }

  formatEventDate(date: string): string {
    return date;
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;

    if (this.showFavorites) {
      this.presentToast('Visualizando seus favoritos');
    } else {
      this.presentToast('Voltando para explorar');
    }

    if (this.content) {
      this.content.scrollToTop(500);
    }
  }

  isFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id, 'explorar');
  }

  toggleFavorite(id: string, title: string) {
    if (this.isFavorite(id)) {
      this.favoritesService.removeFavorite(id, 'explorar');
      this.presentToast(`Removido dos favoritos`);
    } else {
      const event = this.events.find(e => e.id === id || e.title === title);

      if (event) {
        this.favoritesService.addFavorite({
          id: id || event.title,
          title: event.title,
          subtitle: event.subtitle || event.category,
          img: event.img,
          description: event.description,
          location: event.location,
          coordinates: event.coordinates,
          source: 'explorar'
        });
        this.presentToast(`Adicionado aos favoritos`);
      }
    }
  }

  syncFavoritesDetails() {
    this.favoritesService.updateFavoriteDetails(this.events, 'explorar');
  }

  async openDetails(event: Event) {
    const eventId = event.id || event.title;
    const isFavorite = this.isFavorite(eventId);

    const mapUrl = event.coordinates ? 
      `https://www.google.com/maps?q=${event.coordinates.lat},${event.coordinates.lng}` : 
      '';

    let extraInfo = [
      {
        icon: 'calendar-outline',
        label: 'Data',
        value: this.formatEventDate(event.date)
      },
      {
        icon: 'location-outline',
        label: 'Local',
        value: event.location
      },
      {
        icon: 'pricetag-outline',
        label: 'Categoria',
        value: event.category
      }
    ];

    if (event.price) {
      extraInfo.push({
        icon: 'cash-outline',
        label: 'Preço',
        value: event.price
      });
    }

    const { data } = await this.modalService.openDetailModal({
      id: eventId,
      title: event.title,
      subtitle: event.subtitle || event.category,
      img: event.img,
      description: event.description,
      location: event.location,
      coordinates: event.coordinates,
      mapUrl: mapUrl,
      extraInfo: extraInfo,
      mainActionText: event.link ? 'Visitar site' : (mapUrl ? 'Ver no mapa' : undefined),
      actionUrl: event.link || mapUrl,
      isFavorite: isFavorite,
      favorite: isFavorite,
      onToggleFavorite: () => this.toggleFavorite(eventId, event.title)
    });

    if (data && data.favoriteChanged) {
      this.toggleFavorite(eventId, event.title);
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

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
