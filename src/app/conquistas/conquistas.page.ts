import {Component, OnInit} from "@angular/core";
import {ModalController, RefresherCustomEvent} from "@ionic/angular";
import {DetailModalComponent} from "src/app/components/detail-modal/detail-modal.component";

interface Achievement {
  title: string;
  subtitle: string;
  img: string;
  description: string;
  type?: 'viagem' | 'curso';
  date?: string;
  progress?: number;
  completed?: boolean;
}

@Component({
  selector: "app-conquistas",
  templateUrl: "./conquistas.page.html",
  styleUrls: ["./conquistas.page.scss"],
  standalone: false,
})
export class ConquistasPage implements OnInit {
  viewMode: 'cards' | 'grid' = 'cards';
  selectedCategory: 'all' | 'viagens' | 'cursos' = 'all';
  
  filteredItems: Achievement[] = [];
  filteredViagens: Achievement[] = [];
  filteredCursos: Achievement[] = [];
  
  viagens: Achievement[] = [
    {
      title: "Turku, Finlândia",
      subtitle: "2019",
      img: "turku.jpg",
      description: "Cidade histórica com belos castelos à beira do rio.",
      type: "viagem",
      date: "2019"
    },
    {
      title: "Pula, Croácia",
      subtitle: "2020",
      img: "pula.avif",
      description: "Famosa arena romana que ainda recebe eventos.",
      type: "viagem",
      date: "2020"
    },
    {
      title: "Barcelona, Espanha",
      subtitle: "2021",
      img: "Barcelona.webp",
      description: "Capital catalã vibrante, arte de Gaudí e praias.",
      type: "viagem",
      date: "2021"
    },
    {
      title: "Estrasburgo, França",
      subtitle: "2022",
      img: "strasbourg.jpg",
      description: "Centro europeu com canais e catedral gótica.",
      type: "viagem",
      date: "2022"
    },
  ];
  cursos: Achievement[] = [
    {
      title: "Mergulho Avançado",
      subtitle: "Bombeiros 2018",
      img: "mergulho.jpg",
      description: "Técnicas de salvamento subaquático.",
      type: "curso",
      progress: 100,
      completed: true
    },
    {
      title: "UX/UI Design",
      subtitle: "Academia Lisboa 2021",
      img: "uxui.jpg",
      description: "Metodologias de design centrado no utilizador.",
      type: "curso",
      progress: 100,
      completed: true
    },
    {
      title: "Drift Avançado",
      subtitle: "Escola Drift 2023",
      img: "drift.jpg",
      description: "Manobras de derrapagem controlada.",
      type: "curso",
      progress: 80,
      completed: false
    },
  ];

  constructor(private modalController: ModalController) {}
  
  ngOnInit() {
    this.filterItems();
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'cards' ? 'grid' : 'cards';
  }

  filterItems() {
    switch (this.selectedCategory) {
      case 'viagens':
        this.filteredItems = [...this.viagens];
        this.filteredViagens = [...this.viagens];
        this.filteredCursos = [];
        break;
      case 'cursos':
        this.filteredItems = [...this.cursos];
        this.filteredViagens = [];
        this.filteredCursos = [...this.cursos];
        break;
      default: // 'all'
        this.filteredItems = [...this.viagens, ...this.cursos];
        this.filteredViagens = [...this.viagens];
        this.filteredCursos = [...this.cursos];
    }
  }

  showViagens(): boolean {
    return this.selectedCategory === 'all' || this.selectedCategory === 'viagens';
  }

  showCursos(): boolean {
    return this.selectedCategory === 'all' || this.selectedCategory === 'cursos';
  }

  resetFilters() {
    this.selectedCategory = 'all';
    this.filterItems();
  }

  async openDetails(item: Achievement) {
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
