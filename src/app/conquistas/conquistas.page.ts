import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, RefresherCustomEvent, ToastController, IonicModule } from '@ionic/angular';
import { DetailModalComponent } from 'src/app/components/detail-modal/detail-modal.component';
import { ModalService } from '../services/modal.service';
import { FavoritesService } from '../services/favorites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { HeaderWithFavoritesComponent } from '../components/favorites/header.component';

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
  selector: 'app-conquistas',
  templateUrl: './conquistas.page.html',
  styleUrls: ['./conquistas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FavoritesComponent,
    HeaderWithFavoritesComponent
  ]
})
export class ConquistasPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  viewMode: 'cards' | 'grid' = 'cards';
  selectedCategory: 'all' | 'viagens' | 'cursos' = 'all';
  showFavorites: boolean = false;

  filteredItems: Achievement[] = [];
  filteredViagens: Achievement[] = [];
  filteredCursos: Achievement[] = [];

  viagens: Achievement[] = [
    {
      title: 'Turku, Finlândia',
      subtitle: '2019',
      img: 'turku.jpg',
      description: 'Cidade histórica com belos castelos à beira do rio.',
      type: 'viagem',
      date: '2019',
    },
    {
      title: 'Pula, Croácia',
      subtitle: '2019',
      img: 'pula.avif',
      description: 'Famosa arena romana que ainda recebe eventos.',
      type: 'viagem',
      date: '2019',
    },
    {
      title: 'Barcelona, Espanha',
      subtitle: '2019',
      img: 'Barcelona.webp',
      description: 'Capital catalã vibrante, arte de Gaudí e praias.',
      type: 'viagem',
      date: '2019',
    },
    {
      title: 'Bremerhaven, Alemanha',
      subtitle: '2020',
      img: 'Bremerhaven.jpeg',
      description: 'Porto histórico com museus marítimos.',
      type: 'viagem',
      date: '2020',
    },
    {
      title: 'Brendola, Itália',
      subtitle: '2019',
      img: 'Brendola.webp',
      description: 'Cidade pitoresca com arquitetura renascentista.',
      type: 'viagem',
      date: '2019',
    },
    {
      title: 'De Pinte, Bélgica',
      subtitle: '2022',
      img: 'dePinte.png',
      description: 'Cidade encantadora com canais e arquitetura medieval.',
      type: 'viagem',
      date: '2022',
    },
    {
      title: 'Genebra, Suíça',
      subtitle: '2024',
      img: 'Genebra.png',
      description: 'Cidade internacional com o Lago de Genebra.',
      type: 'viagem',
      date: '2024',
    },
    {
      title: 'Golling An Der Salzach, Áustria',
      subtitle: '2019',
      img: 'GollingAnDerSalzach.webp',
      description: 'Pitoresca cidade com montanhas e cascatas.',
      type: 'viagem',
      date: '2019',
    },
    {
      title: 'Malaga, Espanha',
      subtitle: '2018',
      img: 'Malaga.jpg',
      description: 'Praias ensolaradas e rica herança cultural.',
      type: 'viagem',
      date: '2018',
    },
    {
      title: 'Meerkerke, Bélgica',
      subtitle: '2022',
      img: 'meerkerk.jpg',
      description: 'Cidade encantadora com canais e arquitetura medieval.',
      type: 'viagem',
      date: '2022',
    },
    {
      title: 'Mèze, França',
      subtitle: '2022',
      img: 'Meze.jpg',
      description: 'Cidade costeira com praias e gastronomia.',
      type: 'viagem',
      date: '2022',
    },
    {
      title: 'Papenburg, Alemanha',
      subtitle: '2022',
      img: 'papenburg.jpg',
      description: 'Famosa por seus estaleiros e arquitetura histórica.',
      type: 'viagem',
      date: '2022',
    },
    {
      title: 'Paris, França',
      subtitle: '2023',
      img: 'Paris.jpg',
      description: 'Cidade do amor, arte e cultura.',
      type: 'viagem',
      date: '2023',
    },
    {
      title: 'Saint Nazaire, França',
      subtitle: '2023',
      img: 'SaintNazaire.jpg',
      description: 'Porto histórico com rica herança marítima.',
      type: 'viagem',
      date: '2023',
    },
    {
      title: 'Stradella, Itália',
      subtitle: '2019',
      img: 'Stradella.jpeg',
      description: 'Cidade pitoresca com arquitetura renascentista.',
      type: 'viagem',
      date: '2019',
    },
    {
      title: 'Tolouse, França',
      subtitle: '2022',
      img: 'Tolouse.avif',
      description: 'Cidade vibrante com rica herança cultural.',
      type: 'viagem',
      date: '2022',
    },
  ];
  cursos: Achievement[] = [
    {
      title: 'Engenharia Informática',
      subtitle: 'Licenciatura',
      img: 'ipvc.webp',
      description: 'IPVC - Instituto Politécnico de Viana do Castelo 2023 - OnGoing',
      type: 'curso',
      progress: 50,
      completed: false,
    },
    {
      title: '12º Ano de Escolaridade',
      subtitle: 'Gestão e Manutenção de Equipamentos Informáticos',
      img: 'monserrate.jpg',
      description: 'Escola Secundaria de Monserrate 2013 - 2018',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Sistema Integrado de Emergência Médica (SIEM)',
      subtitle: 'Abordagem à Vitima e Reanimação',
      img: 'inem.png',
      description: 'Bombeiros Voluntários de Ponte de Lima 2018',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Abordagem Pré-hospitalar Básica às Emergências Médicas e de Trauma',
      subtitle: 'Emergências Médicas e Trauma',
      img: 'inem.png',
      description: 'Bombeiros Voluntários de Ponte de Lima 2018',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Técnicas de Desencarceramento',
      subtitle: 'Desencarceramento e Transporte de Vitimas',
      img: 'desencarceramento.jpg',
      description: 'Bombeiros Voluntários de Ponte de Lima 2018',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Open Water Diver',
      subtitle: 'Mergulho Subaquático até 18m',
      img: 'mergulho.jpg',
      description: 'Silvasub Diving School 2018',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Curso de Drift - Nível 1',
      subtitle: 'Automobilismo Desportivo',
      img: 'drift.jpg',
      description: 'Comval Racing - Racing School 2019',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Busca e Salvamento K9',
      subtitle: 'Cinotécnia SAR-K9',
      img: 'k9.jpg',
      description: 'Bombeiros Coluntários de Valongo 2019',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Curso de Drift - Nível 2',
      subtitle: 'Automobilismo Desportivo',
      img: 'drift.jpg',
      description: 'Comval Racing - Racing School 2019',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Telecomunicações - Iniciação',
      subtitle: 'SIRESP',
      img: 'siresp.webp',
      description: 'Bombeiros Voluntários de Ponte de Lima 2019',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Língua Inglesa - Vendas',
      subtitle: 'Inglês Comercial',
      img: 'ingles.jpg',
      description: 'Instituto de Emprego e Formação Profissional 2021',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Língua Inglesa - Atendimento ao Público',
      subtitle: 'Inglês Comercial',
      img: 'ingles.jpg',
      description: 'Instituto de Emprego e Formação Profissional 2021',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Código de Contas e Normas Contabilísticas',
      subtitle: 'Contabilidade',
      img: 'snc.png',
      description: 'Instituto de Emprego e Formação Profissional 2021',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'Modelos de Demonstrações Financeiras',
      subtitle: 'Contabilidade',
      img: 'dr.webp',
      description: 'Instituto de Emprego e Formação Profissional 2021',
      type: 'curso',
      progress: 100,
      completed: true,
    },
    {
      title: 'HTML5 e CSS3 / JS / TS / SWING / PHP / MYSQL / C / JAVA / C#',
      subtitle: 'Linguagens de Programação',
      img: 'lp.png',
      description: 'B7Web 2022 - OnGoing',
      type: 'curso',
      progress: 99,
      completed: false,
    },
    {
      title: 'REACT / TAILWIND / BOOTSTRAP / IONIC / ANGULAR / SHADCN',
      subtitle: 'Frameworks',
      img: 'fw.png',
      description: 'B7Web 2022 - OnGoing',
      type: 'curso',
      progress: 99,
      completed: false,
    },
  ];

  constructor(
    private modalService: ModalService,
    private toastController: ToastController,
    private favoritesService: FavoritesService
  ) {}

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
    // Preparar as informações extras baseadas no tipo de conquista
    const extraInfo = [
      {
        icon: item.type === 'viagem' ? 'airplane-outline' : 'school-outline',
        label: item.type === 'viagem' ? 'Tipo' : 'Tipo',
        value: item.type === 'viagem' ? 'Viagem' : 'Curso',
      },
      {
        icon: 'calendar-outline',
        label: 'Data',
        value: item.date || 'Não especificada',
      },
    ];

    // Adicionar informações de progresso se disponíveis
    if (item.progress !== undefined) {
      extraInfo.push({
        icon: 'trending-up-outline',
        label: 'Progresso',
        value: `${item.progress}%`,
      });
    }

    // Adicionar informações de conclusão se disponíveis
    if (item.completed !== undefined) {
      extraInfo.push({
        icon: 'checkmark-circle-outline',
        label: 'Status',
        value: item.completed ? 'Concluído' : 'Em andamento',
      });
    }

    // Usar o serviço de modal para abrir o modal de detalhes
    const { data } = await this.modalService.openDetailModal({
      id: item.title,
      title: item.title,
      subtitle: item.subtitle,
      img: item.img,
      description: item.description,
      extraInfo: extraInfo,
      mainActionText: item.type === 'viagem' ? 'Ver no mapa' : undefined,
      location: item.type === 'viagem' ? item.title : undefined,
      isFavorite: false,
      favorite: false,
      onToggleFavorite: () => {
        console.log(`Status de favorito alterado para: ${item.title}`);
      },
    });

    // Processar dados quando o modal fechar
    if (data && data.favoriteChanged) {
      console.log(`Status de favorito alterado para: ${item.title}`);
    }
  }

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;

    if (this.showFavorites) {
      this.presentToast('Visualizando seus favoritos');
    } else {
      this.presentToast('Voltando para conquistas');
    }

    // Voltar ao topo quando mudar de modo
    if (this.content) {
      this.content.scrollToTop(500);
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
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }
}
