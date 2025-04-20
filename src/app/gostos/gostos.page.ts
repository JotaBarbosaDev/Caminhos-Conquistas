import {Component, OnInit, ViewChild} from "@angular/core";
import {AlertController, IonContent, RefresherCustomEvent, ToastController} from "@ionic/angular";
import {ModalController} from "@ionic/angular";
import {DetailModalComponent} from "src/app/components/detail-modal/detail-modal.component";
import {AnimationController} from "@ionic/angular";

interface Item {
  title: string;
  subtitle: string;
  img: string;
  description: string;
  favorite?: boolean;
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
  
  convivio: Item[] = [
    {
      title: "Noites de Cinema",
      subtitle: "Sessões em casa",
      img: "cinema.jpg",
      description: "Adoro ver os últimos lançamentos com pipocas e amigos.",
      favorite: false
    },
    {
      title: "Jogos de Tabuleiro",
      subtitle: "Amigos",
      img: "tabuleiro.jpg",
      description:
        "Diversão estratégica com clássicos como Catan e Carcassonne.",
      favorite: false
    },
  ];
  gastronomia: Item[] = [
    {
      title: "Francesinha",
      subtitle: "Especialidade do Porto",
      img: "francesinha.jpg",
      description: "Sabor intenso de carne, queijo e molho especial.",
      favorite: false
    },
    {
      title: "Sarrabulho",
      subtitle: "Prato Tradicional em Ponte de Lima",
      img: "sarrabulho.webp",
      description: "Carne de porco com arroz de sangue e especiarias.",
      favorite: false
    },
    {
      title: "Sushi",
      subtitle: "Comida Japonêsa",
      img: "sushi.webp",
      description: "Rolo de arroz com peixe fresco e vegetais.",
      favorite: false
    },
    {
      title: "Bacalhau à Brás",
      subtitle: "Prato Tradicional Português",
      img: "bacalhaubras.jpg",
      description: "Bacalhau desfiado com batata frita e ovos mexidos.",
      favorite: false
    },
  ];
  desporto: Item[] = [
    {
      title: "Ginasio",
      subtitle: "Treinos regulares",
      img: "ginasio.webp",
      description: "Treinos de força e resistência para manter a forma.",
      favorite: false
    },
    {
      title: "Ténis",
      subtitle: "Pavilhão Municipal",
      img: "tenis.webp",
      description: "Desporto para aliviar o stress.",
      favorite: false
    },
    {
      title: "Caminhadas",
      subtitle: "Trilhos Locais",
      img: "caminhada.png",
      description: "Explorar a natureza em trilhos nas montanhas para sair da rotina do computador.",
      favorite: false
    },
  ];

  constructor(
    private modalController: ModalController,
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

  async openDetails(item: Item) {
    const enterAnimation = (baseEl: any) => {
      const backdropAnimation = this.animationCtrl.create()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl.create()
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0.8)' },
          { offset: 1, opacity: '1', transform: 'scale(1)' }
        ]);

      return this.animationCtrl.create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(250)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction('reverse');
    };
    
    const modal = await this.modalController.create({
      component: DetailModalComponent,
      componentProps: {
        title: item.title,
        img: `assets/images/${item.img}`,
        description: item.description,
        favorite: item.favorite,
        onToggleFavorite: () => this.toggleFavorite(item)
      },
      enterAnimation,
      leaveAnimation
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data && data.favoriteChanged) {
      this.saveFavorites();
    }
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
    }
  }
  
  async toggleFavorite(item: Item) {
    item.favorite = !item.favorite;
    
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
