import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {AlertController, IonContent, RefresherCustomEvent, ToastController} from "@ionic/angular";
import {ModalService} from "src/app/services/modal.service";
import {AnimationController} from "@ionic/angular";

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
  standalone: false,
})
export class TerraPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  
  // Controles de UI
  showMap: boolean = false;
  showScrollButton: boolean = false;

  districtDescription =
    "Viana do Castelo é um distrito costeiro do Norte de Portugal, conhecido pela história, cultura e paisagens naturais. Situado entre o Oceano Atlântico e as montanhas, oferece cenários deslumbrantes e uma rica herança cultural.";
  municipalityDescription =
    "Ponte de Lima, o concelho mais antigo de Portugal, famoso pela ponte romana e festivais tradicionais. Este município combina história medieval com paisagens rurais encantadoras e uma forte tradição gastronômica.";
  parishDescription =
    "Freixo é uma freguesia pitoresca de Ponte de Lima, com raízes históricas e ambiente rural. Caracterizada por montanhas, vales e uma comunidade acolhedora, mantém vivas as tradições agrícolas e festivas do Alto Minho.";

  district: Place[] = [
    {
      title: "Castelo de Santiago da Barra",
      subtitle: "Fortaleza histórica",
      img: "barra-castle.jpg",
      description: "Construído no século XVI para defesa costeira. Este forte impressionante está localizado na foz do rio Lima e oferece vistas panorâmicas do oceano e da cidade de Viana do Castelo.",
      location: "Viana do Castelo",
      coordinates: { lat: 41.6913, lng: -8.8348 }
    },
    {
      title: "Praia do Cabedelo",
      subtitle: "Costa selvagem",
      img: "cabedelo.jpg",
      description: "Ideal para surf e longas caminhadas. Com dunas extensas e águas cristalinas, esta praia é um paraíso para os amantes da natureza e desportos aquáticos.",
      location: "Sul de Viana do Castelo",
      coordinates: { lat: 41.6818, lng: -8.8407 }
    },
    {
      title: "Santuário de Santa Luzia",
      subtitle: "Monumento religioso",
      img: "santa-luzia.jpg",
      description: "Um impressionante santuário no topo da montanha com vistas deslumbrantes sobre a cidade, o rio Lima e o oceano Atlântico.",
      location: "Monte de Santa Luzia",
      coordinates: { lat: 41.7011, lng: -8.8375 }
    }
  ];
  
  municipality: Place[] = [
    {
      title: "Ponte Romana",
      subtitle: "Património UNESCO",
      img: "ponte-romana.jpg",
      description: "Estrutura centenária sobre o Rio Lima. Esta ponte medieval com 24 arcos é o símbolo mais emblemático da vila de Ponte de Lima e um marco histórico essencial.",
      location: "Centro de Ponte de Lima",
      coordinates: { lat: 41.7674, lng: -8.5835 }
    },
    {
      title: "Jardim do Arnado",
      subtitle: "Espaço verde",
      img: "arnado.jpg",
      description: "Parque botânico com vistas magníficas. Situado junto ao rio, este jardim encantador oferece um espaço tranquilo para passeios e contemplação da natureza.",
      location: "Margem do Rio Lima",
      coordinates: { lat: 41.7659, lng: -8.5813 }
    },
    {
      title: "Festival Internacional de Jardins",
      subtitle: "Evento anual",
      img: "festival-jardins.jpg",
      description: "Um evento único onde artistas e paisagistas de todo o mundo criam jardins temáticos inovadores e surpreendentes.",
      location: "Parque do Arnado",
      coordinates: { lat: 41.7663, lng: -8.5809 }
    }
  ];
  
  parish: Place[] = [
    {
      title: "Igreja Matriz de Freixo",
      subtitle: "Arquitetura barroca",
      img: "igreja-freixo.jpg",
      description: "Igreja secular com belos detalhes. Este templo histórico apresenta um notável trabalho em pedra e talha dourada que reflete a importância espiritual da comunidade.",
      location: "Centro de Freixo",
      coordinates: { lat: 41.7531, lng: -8.5337 }
    },
    {
      title: "Campo de Lavradio",
      subtitle: "Paisagem rural",
      img: "campo-lavradio.jpg",
      description: "Área agrícola típica da região. Estes campos verdejantes são o coração da economia local e oferecem um vislumbre autêntico da vida rural portuguesa.",
      location: "Arredores de Freixo",
      coordinates: { lat: 41.7523, lng: -8.5378 }
    },
    {
      title: "Festa de São Sebastião",
      subtitle: "Tradição local",
      img: "festa-sao-sebastiao.jpg",
      description: "Celebração anual em honra do santo padroeiro, com procissões, música tradicional e gastronomia regional.",
      location: "Centro da freguesia",
      coordinates: { lat: 41.7529, lng: -8.5339 }
    }
  ];

  constructor(
    private modalService: ModalService,
    private toastController: ToastController
  ) {}
  
  ngOnInit() {
    // Adicionar listener para detectar o scroll e mostrar/esconder o botão de voltar ao topo
    this.setupScrollListener();
  }
  
  setupScrollListener() {
    // Este método seria implementado para detectar quando o usuário scrollou suficiente
    // para mostrar o botão de voltar ao topo
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
    
    // Mostrar uma mensagem contextual para o usuário
    const message = this.showMap ? 
      'Visualizando mapa da região' : 
      'Visualizando pontos de interesse';
    
    this.presentToast(message);
    
    // Voltar ao topo quando mudar de modo
    this.scrollToTop();
  }
  
  scrollToTop() {
    this.content.scrollToTop(500);
  }
  
  async openDetails(item: Place) {
    const itemId = item.id || item.title;
    const isFavorite = this.isFavorite(itemId);
    
    // Gerar mapUrl apenas se as coordenadas existirem
    const mapUrl = item.mapUrl || (item.coordinates ? this.getMapUrl(item.coordinates) : '');
    
    // Criando informações extras mais detalhadas
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
    
    // Adicionar coordenadas se disponíveis
    if (item.coordinates) {
      extraInfo.push({
        icon: 'map-outline',
        label: 'Coordenadas',
        value: `${item.coordinates.lat.toFixed(4)}, ${item.coordinates.lng.toFixed(4)}`
      });
    }
    
    // Usar o serviço de modal para abrir o modal de detalhes
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
    
    // Processar dados quando o modal fechar
    if (data && data.favoriteChanged) {
      this.toggleFavorite(itemId, item.title);
      this.saveFavorites();
    }
  }
  
  // Método para verificar se um item é favorito
  isFavorite(id: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === id);
  }
  
  // Método para alternar o estado de favorito de um item
  toggleFavorite(id: string, title: string) {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.id === id);
    
    if (index >= 0) {
      // Remover dos favoritos
      favorites.splice(index, 1);
      this.presentToast(`Removido dos favoritos`);
    } else {
      // Adicionar aos favoritos
      favorites.push({ id, title });
      this.presentToast(`Adicionado aos favoritos`);
    }
    
    this.saveFavorites(favorites);
  }
  
  // Método para obter a lista de favoritos
  getFavorites(): {id: string, title: string}[] {
    try {
      const saved = localStorage.getItem('terra-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Erro ao carregar favoritos:', e);
      return [];
    }
  }
  
  // Método para salvar favoritos
  saveFavorites(favorites?: {id: string, title: string}[]) {
    const favsToSave = favorites || this.getFavorites();
    localStorage.setItem('terra-favorites', JSON.stringify(favsToSave));
  }
  
  // Método para criar uma URL de mapa a partir de coordenadas
  getMapUrl(coordinates: { lat: number, lng: number }): string {
    if (!coordinates) return '';
    return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
  }

  doRefresh(event: RefresherCustomEvent) {
    // Simular uma atualização de dados
    setTimeout(() => {
      this.randomizePlaces();
      event.target.complete();
      this.presentToast('Conteúdo atualizado!');
    }, 1500);
  }
  
  private randomizePlaces() {
    // Fisher-Yates shuffle algorithm para simular a atualização de dados
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
