import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { AlertController, IonContent, RefresherCustomEvent, ToastController, IonicModule } from "@ionic/angular";
import { ModalService } from "src/app/services/modal.service";
import { AnimationController } from "@ionic/angular";
import { FavoritesService, FavoriteItem } from "../services/favorites.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { HeaderWithFavoritesComponent } from '../components/favorites/header.component';
import * as L from 'leaflet';

interface Place {
  id?: string;
  title: string;
  subtitle: string;
  img: string;
  description: string;
  location?: string;
  coordinates?: { lat: number, lng: number };
  mapUrl?: string;
}

@Component({
  selector: "app-terra",
  templateUrl: "./terra.page.html",
  styleUrls: ["./terra.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FavoritesComponent,
    HeaderWithFavoritesComponent
  ]
})
export class TerraPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent) content!: IonContent;
  
  showMap: boolean = false;
  showScrollButton: boolean = false;
  showFavorites: boolean = false;
  
  private map: L.Map | null = null;
  private markers: L.Marker[] = [];
  private isMapInitialized: boolean = false;

  private mapCenter: [number, number] = [41.7, -8.7];
  private defaultZoom: number = 10;

  districtDescription =
    "Viana do Castelo é um distrito costeiro do Norte de Portugal, conhecido pela história, cultura e paisagens naturais. Situado entre o Oceano Atlântico e as montanhas, oferece cenários deslumbrantes e uma rica herança cultural.";
  municipalityDescription =
    "Ponte de Lima, o concelho mais antigo de Portugal, famoso pela ponte romana e festivais tradicionais. Este município combina história medieval com paisagens rurais encantadoras e uma forte tradição gastronómica.";
  parishDescription =
    "Freixo é uma freguesia pitoresca de Ponte de Lima, com raízes históricas e ambiente rural. Caracterizada por montanhas, vales e uma comunidade acolhedora, mantém vivas as tradições agrícolas e festivas do Alto Minho.";

  district: Place[] = [
    {
      title: "Castelo de Santiago da Barra",
      subtitle: "Fortaleza histórica",
      img: "../../assets/images/castelobarra.jpg",
      description: "Construído no século XVI para defesa costeira. Este forte impressionante está localizado na foz do rio Lima e oferece vistas panorâmicas do oceano e da cidade de Viana do Castelo.",
      location: "Viana do Castelo",
      coordinates: { lat: 41.6913, lng: -8.8348 }
    },
    {
      title: "Praia do Cabedelo",
      subtitle: "Costa selvagem",
      img: "../../assets/images/PraiadoCabedelo.jpg",
      description: "Ideal para surf e longas caminhadas. Com dunas extensas e águas cristalinas, esta praia é um paraíso para os amantes da natureza e desportos aquáticos.",
      location: "Sul de Viana do Castelo",
      coordinates: { lat: 41.6818, lng: -8.8407 }
    },
    {
      title: "Santuário de Santa Luzia",
      subtitle: "Monumento religioso",
      img: "../../assets/images/santuariostluzia.jpg",
      description: "Um impressionante santuário no topo da montanha com vistas deslumbrantes sobre a cidade, o rio Lima e o oceano Atlântico.",
      location: "Monte de Santa Luzia",
      coordinates: { lat: 41.7011, lng: -8.8375 }
    }
  ];
  
  municipality: Place[] = [
    {
      title: "Ponte Romana",
      subtitle: "Património UNESCO",
      img: "../../assets/images/ponteromana.jpg",
      description: "Estrutura centenária sobre o Rio Lima. Esta ponte medieval com 24 arcos é o símbolo mais emblemático da vila de Ponte de Lima e um marco histórico essencial.",
      location: "Centro de Ponte de Lima",
      coordinates: { lat: 41.7674, lng: -8.5835 }
    },
    {
      title: "Jardim do Arnado",
      subtitle: "Espaço verde",
      img: "../../assets/images/jardimarnado.jpg",
      description: "Parque botânico com vistas magníficas. Situado junto ao rio, este jardim encantador oferece um espaço tranquilo para passeios e contemplação da natureza.",
      location: "Margem do Rio Lima",
      coordinates: { lat: 41.7659, lng: -8.5813 }
    },
    {
      title: "Festival Internacional de Jardins",
      subtitle: "Evento anual",
      img: "../../assets/images/festivaljardins.jpg",
      description: "Um evento único onde artistas e paisagistas de todo o mundo criam jardins temáticos inovadores e surpreendentes.",
      location: "Parque do Arnado",
      coordinates: { lat: 41.7663, lng: -8.5809 }
    }
  ];
  
  parish: Place[] = [
    {
      title: "Igreja Matriz de Freixo",
      subtitle: "Arquitetura barroca",
      img: "../../assets/images/igrejafreixo.jpg",
      description: "Igreja secular com belos detalhes. Este templo histórico apresenta um notável trabalho em pedra e talha dourada que reflete a importância espiritual da comunidade.",
      location: "Centro de Freixo",
      coordinates: { lat: 41.7531, lng: -8.5337 }
    },
    {
      title: "Campo de Lavradio",
      subtitle: "Paisagem rural",
      img: "../../assets/images/campo-lavradio.jpg",
      description: "Área agrícola típica da região. Estes campos verdejantes são o coração da economia local e oferecem um vislumbre autêntico da vida rural portuguesa.",
      location: "Arredores de Freixo",
      coordinates: { lat: 41.7523, lng: -8.5378 }
    },
    {
      title: "Festa de São Sebastião",
      subtitle: "Tradição local",
      img: "../../assets/images/festassebastiao.jpg",
      description: "Celebração anual em honra do santo padroeiro, com procissões, música tradicional e gastronomia regional.",
      location: "Centro da freguesia",
      coordinates: { lat: 41.7529, lng: -8.5339 }
    }
  ];

  constructor(
    private modalService: ModalService,
    private toastController: ToastController,
    private favoritesService: FavoritesService
  ) {}
  
  ngOnInit() {
    this.setupScrollListener();
    this.syncFavoritesDetails();
  }
  
  ngAfterViewInit() {
    this.loadLeafletStyles();
  }
  
  private loadLeafletStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);
  }
  
  setupScrollListener() {
    setTimeout(() => {
      const contentElement = this.content as any;
      if (contentElement && contentElement.scrollEvents) {
        contentElement.ionScroll.subscribe((event: any) => {
          this.showScrollButton = event.detail.scrollTop > 300;
        });
      }
    }, 500);
  }
  
  toggleMap() {
    this.showMap = !this.showMap;
    
    const message = this.showMap ? 
      'A visualizar mapa da região' : 
      'A visualizar pontos de interesse';
    
    this.presentToast(message);
    
    if (this.showMap) {
      setTimeout(() => {
        this.initializeMap();
      }, 300);
    }
    
    this.scrollToTop();
  }
  
  private initializeMap() {
    if (this.isMapInitialized && this.map) {
      this.map.invalidateSize();
      return;
    }
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Elemento do mapa não encontrado');
      return;
    }

    this.map = L.map('map').setView(this.mapCenter, this.defaultZoom);
    
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 19
    }).addTo(this.map);
    
    this.addMarkersToMap();
    this.addRegionPolygonsToMap();
    
    this.isMapInitialized = true;
  }
  
  private addMarkersToMap() {
    if (!this.map) return;
    
    this.clearMarkers();
    
    const allPlaces = [
      ...this.district, 
      ...this.municipality, 
      ...this.parish
    ].filter(place => place.coordinates);
    
    const createIcon = (region: string) => {
      const color = region === 'district' ? '#3880ff' : 
                   region === 'municipality' ? '#2dd36f' : 
                   '#5260ff';
      
      return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
    };
    
    allPlaces.forEach(place => {
      if (place.coordinates) {
        let region = 'parish';
        if (this.district.find(p => p.title === place.title)) {
          region = 'district';
        } else if (this.municipality.find(p => p.title === place.title)) {
          region = 'municipality';
        }
        
        const marker = L.marker(
          [place.coordinates.lat, place.coordinates.lng],
          { icon: createIcon(region) }
        ).addTo(this.map!);
        
        marker.bindPopup(`
          <strong>${place.title}</strong><br>
          ${place.subtitle}<br>
          <small>${place.location || ''}</small>
        `);
        
        this.markers.push(marker);
      }
    });
  }
  
  private addRegionPolygonsToMap() {
    if (!this.map) return;
    
    const districtCoords: L.LatLngExpression[] = [
      [41.80, -8.90],
      [41.90, -8.70],
      [42.10, -8.50],
      [42.10, -8.20],
      [41.80, -8.10],
      [41.60, -8.30],
      [41.50, -8.50],
      [41.55, -8.80],
      [41.80, -8.90]
    ];
    
    const municipalityCoords: L.LatLngExpression[] = [
      [41.74, -8.65],
      [41.80, -8.55],
      [41.85, -8.50],
      [41.80, -8.40],
      [41.70, -8.45],
      [41.65, -8.55],
      [41.74, -8.65]
    ];
    
    const parishCoords: L.LatLngExpression[] = [
      [41.75, -8.54],
      [41.76, -8.52],
      [41.75, -8.50],
      [41.74, -8.51],
      [41.75, -8.54]
    ];
    
    L.polygon(districtCoords, {
      color: '#3880ff',
      weight: 2,
      fillOpacity: 0.1
    }).addTo(this.map).bindPopup('Distrito de Viana do Castelo');
    
    L.polygon(municipalityCoords, {
      color: '#2dd36f',
      weight: 2,
      fillOpacity: 0.1
    }).addTo(this.map).bindPopup('Concelho de Ponte de Lima');
    
    L.polygon(parishCoords, {
      color: '#5260ff',
      weight: 2,
      fillOpacity: 0.1
    }).addTo(this.map).bindPopup('Freguesia de Freixo');
  }
  
  private clearMarkers() {
    if (!this.map) return;
    
    this.markers.forEach(marker => {
      this.map!.removeLayer(marker);
    });
    
    this.markers = [];
  }
  
  scrollToTop() {
    this.content.scrollToTop(500);
  }
  
  async openDetails(item: Place) {
    const itemId = item.id || item.title;
    const isFavorite = this.isFavorite(itemId);
    
    const mapUrl = item.mapUrl || (item.coordinates ? this.getMapUrl(item.coordinates) : '');
    
    let extraInfo = [
      {
        icon: 'location-outline',
        label: 'Localização',
        value: item.location || 'Não especificada'
      },
      {
        icon: 'information-circle-outline',
        label: 'Tipo',
        value: item.subtitle || 'Ponto de interesse'
      }
    ];
    
    if (item.coordinates) {
      extraInfo.push({
        icon: 'map-outline',
        label: 'Coordenadas',
        value: `${item.coordinates.lat.toFixed(4)}, ${item.coordinates.lng.toFixed(4)}`
      });
    }
    
    const { data } = await this.modalService.openDetailModal({
      id: itemId,
      title: item.title,
      img: item.img,
      description: item.description,
      location: item.location,
      subtitle: item.subtitle || 'Ponto de interesse',
      coordinates: item.coordinates,
      mapUrl: mapUrl,
      extraInfo: extraInfo,
      mainActionText: 'Ver no mapa',
      isFavorite: isFavorite,
      favorite: isFavorite,
      onToggleFavorite: () => this.toggleFavorite(itemId, item.title)
    });
    
    if (data && data.favoriteChanged) {
      this.toggleFavorite(itemId, item.title);
    }
  }
  
  isFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id, 'terra');
  }
  
  toggleFavorite(id: string, title: string) {
    if (this.isFavorite(id)) {
      this.favoritesService.removeFavorite(id, 'terra');
      this.presentToast(`Removido dos favoritos`);
    } else {
      const item = [
        ...this.district, 
        ...this.municipality, 
        ...this.parish
      ].find(p => p.id === id || p.title === id);
      
      if (item) {
        this.favoritesService.addFavorite({
          id: id,
          title: item.title,
          subtitle: item.subtitle,
          img: item.img,
          description: item.description,
          location: item.location,
          coordinates: item.coordinates,
          source: 'terra'
        });
        this.presentToast(`Adicionado aos favoritos`);
      }
    }
  }

  syncFavoritesDetails() {
    const allPlaces = [...this.district, ...this.municipality, ...this.parish];
    this.favoritesService.updateFavoriteDetails(allPlaces, 'terra');
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
    
    if (this.showFavorites) {
      this.presentToast('A visualizar os seus favoritos');
    } else {
      this.presentToast('A voltar para pontos de interesse');
    }
    
    this.scrollToTop();
  }

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.randomizePlaces();
      event.target.complete();
      this.presentToast('Conteúdo atualizado!');
    }, 1500);
  }
  
  private randomizePlaces() {
    const shuffle = (array: Place[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    
    this.district = shuffle([...this.district]);
    this.municipality = shuffle([...this.municipality]);
    this.parish = shuffle([...this.parish]);
  }
  
  private getMapUrl(coordinates: { lat: number, lng: number }): string {
    return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
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
