import {Component, OnInit, ViewChild} from "@angular/core";
import {AlertController, IonContent, RefresherCustomEvent, ToastController} from "@ionic/angular";
import {ModalService} from "src/app/services/modal.service";
import {AnimationController} from "@ionic/angular";

interface Item {
  id?: string;
  title: string;
  subtitle: string;
  img: string;
  description: string;
  favorite?: boolean;
  location?: string;
  expanded?: boolean; // Nova propriedade para controlar expansão
  extraInfo?: Array<{icon: string; label: string; value: string}>;
}

@Component({
  selector: "app-gostos",
  templateUrl: "./gostos.page.html",
  styleUrls: ["./gostos.page.scss"],
  standalone: false,
})
export class GostosPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  
  selectedCategory = "conv";
  lastSelectedCategory = "conv";
  
  // Item que está expandido atualmente
  expandedItem: Item | null = null;
  
  convivio: Item[] = [
    {
      title: "Noites de Cinema",
      subtitle: "Sessões em casa",
      img: "cinema.jpg",
      description: "Adoro ver os últimos lançamentos com pipocas e amigos.",
      favorite: false,
      expanded: false
    },
    {
      title: "Jogos de Tabuleiro",
      subtitle: "Amigos",
      img: "tabuleiro.jpg",
      description:
        "Diversão estratégica com clássicos como Catan e Carcassonne.",
      favorite: false,
      expanded: false
    },
  ];
  
  // Resto dos arrays com a propriedade expanded adicionada
  gastronomia: Item[] = [
    {
      title: "Francesinha",
      subtitle: "Especialidade do Porto",
      img: "francesinha.jpg",
      description: "Sabor intenso de carne, queijo e molho especial.",
      favorite: false,
      expanded: false
    },
    {
      title: "Sarrabulho",
      subtitle: "Prato Tradicional em Ponte de Lima",
      img: "sarrabulho.webp",
      description: "Carne de porco com arroz de sangue e especiarias.",
      favorite: false,
      expanded: false
    },
    {
      title: "Sushi",
      subtitle: "Comida Japonêsa",
      img: "sushi.webp",
      description: "Rolo de arroz com peixe fresco e vegetais.",
      favorite: false,
      expanded: false
    },
    {
      title: "Bacalhau à Brás",
      subtitle: "Prato Tradicional Português",
      img: "bacalhaubras.jpg",
      description: "Bacalhau desfiado com batata frita e ovos mexidos.",
      favorite: false,
      expanded: false
    },
  ];
  
  desporto: Item[] = [
    {
      title: "Ginasio",
      subtitle: "Treinos regulares",
      img: "ginasio.webp",
      description: "Treinos de força e resistência para manter a forma.",
      favorite: false,
      expanded: false
    },
    {
      title: "Ténis",
      subtitle: "Pavilhão Municipal",
      img: "tenis.webp",
      description: "Desporto para aliviar o stress.",
      favorite: false,
      expanded: false
    },
    {
      title: "Caminhadas",
      subtitle: "Trilhos Locais",
      img: "caminhada.png",
      description: "Explorar a natureza em trilhos nas montanhas para sair da rotina do computador.",
      favorite: false,
      expanded: false
    },
  ];

  constructor(
    private modalService: ModalService,
    private toastController: ToastController,
    private alertController: AlertController,
    private animationCtrl: AnimationController
  ) {}
  
  ngOnInit() {
    // Carregar favoritos salvos do localStorage, se houver
    this.loadFavorites();
  }
  
  getItems(category: string): Item[] {
    switch (category) {
      case "gastr":
        return this.gastronomia;
      case "desp":
        return this.desporto;
      default:
        return this.convivio;
    }
  }

  // Novo método para expandir/colapsar o card
  toggleItemExpansion(item: Item) {
    // Fecha o item que estava expandido anteriormente
    if (this.expandedItem && this.expandedItem !== item) {
      this.expandedItem.expanded = false;
    }
    
    // Alterna o estado do item atual
    item.expanded = !item.expanded;
    
    // Atualiza o item expandido atual
    this.expandedItem = item.expanded ? item : null;
    
    // Animação para o item
    setTimeout(() => {
      const element = document.getElementById(`card-${item.title.replace(/\s+/g, '-').toLowerCase()}`);
      if (element) {
        const animation = this.animationCtrl.create()
          .addElement(element)
          .duration(300)
          .easing('ease-out')
          .keyframes([
            { offset: 0, transform: 'scale(1)' },
            { offset: 0.5, transform: 'scale(1.03)' },
            { offset: 1, transform: 'scale(1)' }
          ]);
        
        animation.play();
      }
    }, 50);
  }

  // Obter informações extras para o card expandido
  getExtraInfo(item: Item): Array<{icon: string; label: string; value: string}> {
    const category = this.selectedCategory;
    let extraInfo = [];
    
    if (category === "gastr") {
      extraInfo = [
        {
          icon: 'restaurant-outline',
          label: 'Categoria',
          value: 'Gastronomia'
        },
        {
          icon: 'flag-outline',
          label: 'Tipo',
          value: item.subtitle
        }
      ];
    } else if (category === "desp") {
      extraInfo = [
        {
          icon: 'fitness-outline',
          label: 'Categoria',
          value: 'Desporto'
        },
        {
          icon: 'location-outline',
          label: 'Local',
          value: item.subtitle
        }
      ];
    } else { // convívio
      extraInfo = [
        {
          icon: 'people-outline',
          label: 'Categoria',
          value: 'Convívio'
        },
        {
          icon: 'information-circle-outline',
          label: 'Tipo',
          value: item.subtitle
        }
      ];
    }
    
    return extraInfo;
  }

  doRefresh(event: RefresherCustomEvent) {
    // Simular uma atualização de dados
    setTimeout(() => {
      this.shuffleItems();
      event.target.complete();
      this.presentToast('Conteúdo atualizado!');
    }, 1500);
  }
  
  onCategoryChange() {
    // Quando a categoria muda, fazemos scroll para o topo
    if (this.lastSelectedCategory !== this.selectedCategory) {
      this.content.scrollToTop(300);
      this.lastSelectedCategory = this.selectedCategory;
      
      // Reset o item expandido quando mudar de categoria
      if (this.expandedItem) {
        this.expandedItem.expanded = false;
        this.expandedItem = null;
      }
    }
  }
  
  async toggleFavorite(item: Item) {
    item.favorite = !item.favorite;
    
    // Efeito de animação no ícone
    const favoriteIcon = document.querySelector(`#card-${item.title.replace(/\s+/g, '-').toLowerCase()} .favorite-icon`);
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
    
    await this.presentToast(
      item.favorite 
        ? `${item.title} adicionado aos favoritos!` 
        : `${item.title} removido dos favoritos!`
    );
    
    this.saveFavorites();
  }
  
  private saveFavorites() {
    const favorites = {
      convivio: this.convivio.map(item => ({title: item.title, favorite: item.favorite})),
      gastronomia: this.gastronomia.map(item => ({title: item.title, favorite: item.favorite})),
      desporto: this.desporto.map(item => ({title: item.title, favorite: item.favorite}))
    };
    
    localStorage.setItem('gostosFavorites', JSON.stringify(favorites));
  }
  
  private loadFavorites() {
    const savedFavorites = localStorage.getItem('gostosFavorites');
    if (!savedFavorites) return;
    
    try {
      const favorites = JSON.parse(savedFavorites);
      
      // Atualizar status de favoritos para cada categoria
      if (favorites.convivio) {
        favorites.convivio.forEach((fav: {title: string, favorite: boolean}) => {
          const item = this.convivio.find(i => i.title === fav.title);
          if (item) item.favorite = fav.favorite;
        });
      }
      
      if (favorites.gastronomia) {
        favorites.gastronomia.forEach((fav: {title: string, favorite: boolean}) => {
          const item = this.gastronomia.find(i => i.title === fav.title);
          if (item) item.favorite = fav.favorite;
        });
      }
      
      if (favorites.desporto) {
        favorites.desporto.forEach((fav: {title: string, favorite: boolean}) => {
          const item = this.desporto.find(i => i.title === fav.title);
          if (item) item.favorite = fav.favorite;
        });
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos:', e);
    }
  }
  
  private shuffleItems() {
    // Fisher-Yates shuffle algorithm
    const shuffle = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    
    this.convivio = shuffle([...this.convivio]);
    this.gastronomia = shuffle([...this.gastronomia]);
    this.desporto = shuffle([...this.desporto]);
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
