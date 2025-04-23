import {Component, OnInit} from "@angular/core";
import {ToastController, RefresherCustomEvent} from "@ionic/angular";
import {ModalService} from "../services/modal.service";

interface Event {
  id?: string;
  title: string;
  location: string;
  date: string;
  img: string;
  details: string;
  description?: string; 
  category?: string;
  rating?: number;
  hours?: string;
  price?: string;
  actionText?: string;
  mapUrl?: string;
}
@Component({
  selector: "app-explorar",
  templateUrl: "./explorar.page.html",
  styleUrls: ["./explorar.page.scss"],
  standalone: false,
})
export class ExplorarPage implements OnInit {
  events: Event[] = [
    {
      title: "Romaria da Agonia",
      location: "Viana do Castelo",
      date: "Agosto",
      img: "agonia.jpg",
      details: "Festa tradicional com procissões e música.",
      description:
        "A Romaria da Agonia é uma festa religiosa que celebra a devoção à Nossa Senhora da Agonia, com procissões, danças e trajes típicos. É um evento vibrante que atrai visitantes de todo o país.",
      category: "cultural"
    },
    {
      title: "Feiras Novas",
      location: "Ponte de Lima",
      date: "Setembro",
      img: "feirasnovas.jpg",
      details: "Festival com tasquinhas e concertos.",
      description:
        "As Feiras Novas são uma celebração popular que inclui música, danças e gastronomia local. É uma oportunidade para experimentar a cultura e tradições da região.",
      category: "gastronomia"
    },
    {
      title: "Caminho de Santiago",
      location: "Freixo",
      date: "Todo o ano",
      img: "caminho.jpg",
      details: "Percurso para peregrinos com paisagens históricas.",
      description:
        "O Caminho de Santiago é uma rota histórica que leva os peregrinos a Santiago de Compostela. Atravessa paisagens deslumbrantes e locais históricos, oferecendo uma experiência espiritual e cultural.",
      category: "desporto"
    },
    {
      title: "Museu do Traje",
      location: "Ponte de Lima",
      date: "Diariamente",
      img: "museu-traje.jpg",
      details: "Exposições de trajes regionais.",
      description:
        "O Museu do Traje apresenta a rica herança cultural da região através de trajes tradicionais. As exposições oferecem uma visão fascinante da história e costumes locais.",
      category: "cultural"
    },
  ];

  // Propriedades para controle de visualização e filtros
  viewType: 'grid' | 'list' = 'grid';
  searchTerm: string = '';
  selectedCategory: string = 'all';
  filteredEvents: Event[] = [];
  favorites: string[] = [];

  constructor(private modalService: ModalService, private toastController: ToastController) {}
  
  ngOnInit() {
    // Inicializa a lista filtrada com todos os eventos
    this.filteredEvents = [...this.events];
    
    // Carregar favoritos salvos no localStorage
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites);
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos:', e);
      this.favorites = [];
    }
  }

  // Alterna entre visualização em grade e lista
  toggleView() {
    this.viewType = this.viewType === 'grid' ? 'list' : 'grid';
  }

  // Filtra eventos com base na pesquisa e categoria selecionada
  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      // Filtro por termo de pesquisa
      const matchesSearch = !this.searchTerm || 
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtro por categoria
      const matchesCategory = this.selectedCategory === 'all' || 
        event.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  // Reseta os filtros para o estado inicial
  resetFilters() {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.filteredEvents = [...this.events];
  }

  // Formata a data do evento para exibição
  formatEventDate(date: string): string {
    return date;
  }

  async openDetails(item: Event) {
    // Usar o título como ID se não existir um ID específico
    const itemId = item.id || item.title;
    
    // Preparar informações extras
    const extraInfo = [];
    
    // Adicionar categoria se disponível
    if (item.category) {
      extraInfo.push({
        icon: 'pricetag-outline',
        label: 'Categoria',
        value: item.category
      });
    }
    
    // Adicionar data
    extraInfo.push({
      icon: 'calendar-outline',
      label: 'Data',
      value: item.date
    });
    
    // Adicionar avaliação se disponível
    if (item.rating) {
      extraInfo.push({
        icon: 'star-outline',
        label: 'Avaliação',
        value: `${item.rating}/5`
      });
    }
    
    // Adicionar horário se disponível
    if (item.hours) {
      extraInfo.push({
        icon: 'time-outline',
        label: 'Horário',
        value: item.hours
      });
    }
    
    // Adicionar preço se disponível
    if (item.price) {
      extraInfo.push({
        icon: 'cash-outline',
        label: 'Preço médio',
        value: item.price
      });
    }
    
    // Usar o serviço de modal para abrir o modal de detalhes
    const { data } = await this.modalService.openDetailModal({
      id: itemId,
      title: item.title,
      subtitle: item.category || 'Evento',
      img: item.img,
      description: item.description || item.details,
      location: item.location,
      mapUrl: item.mapUrl,
      extraInfo: extraInfo,
      mainActionText: item.actionText || 'Ver localização',
      isFavorite: this.isFavorite(itemId),
      favorite: this.isFavorite(itemId),
      onToggleFavorite: () => this.toggleFavorite(itemId)
    });
    
    // Atualizar favoritos se necessário
    if (data && data.favoriteChanged) {
      this.toggleFavorite(itemId);
      
      // Mostrar uma mensagem ao usuário
      const toast = await this.toastController.create({
        message: this.isFavorite(itemId) ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
        duration: 2000,
        position: 'bottom'
      });
      
      await toast.present();
    }
  }
  
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }
  
  toggleFavorite(id: string) {
    const index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(id);
    }
    
    // Atualizar o armazenamento local de favoritos
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  
  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
