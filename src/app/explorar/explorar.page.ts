import {Component, OnInit} from "@angular/core";
import {ToastController, RefresherCustomEvent} from "@ionic/angular";
import {ModalController} from "@ionic/angular";
import {DetailModalComponent} from "src/app/components/detail-modal/detail-modal.component";

interface Event {
  title: string;
  location: string;
  date: string;
  img: string;
  details: string;
  description?: string; 
  category?: string;
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

  constructor(private modalController: ModalController, private toastController: ToastController) {}
  
  ngOnInit() {
    // Inicializa a lista filtrada com todos os eventos
    this.filteredEvents = [...this.events];
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

  async openDetails(item: any) {
    const modal = await this.modalController.create({
      component: DetailModalComponent,
      componentProps: {
        title: item.title,
        img: `assets/images/${item.img}`,
        description: item.description,
      },
    });
    await modal.present();
  }

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
