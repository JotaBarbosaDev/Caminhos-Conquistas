import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, AlertController, ToastController, RefresherCustomEvent, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { HeaderWithFavoritesComponent } from '../components/favorites/header.component';

interface Skill {
  name: string;
  level: string;
}
interface Experience {
  role: string;
  company: string;
  period: string;
  icon: string;
  description?: string;
  tags?: string[];
}
interface Language {
  name: string;
  level: string;
}
interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FavoritesComponent,
    HeaderWithFavoritesComponent
  ]
})
export class PerfilPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  // Dados do usuário que faltavam no template
  userData = {
    name: 'João Barbosa',
    location: 'Freixo, Ponte de Lima',
    bio: 'Engenheiro Informático com foco em UX/UI e desenvolvimento mobile. Apaixonado por viagens e tecnologia.',
    profileImage: 'user-profile.jpg',
    friends: 123,
    photos: 42,
    places: 18
  };

  // Lista de amigos para o template
  friends = [
    { name: 'Ana Silva', img: 'friend1.jpg' },
    { name: 'Carlos Oliveira', img: 'friend2.jpg' },
    { name: 'Maria Santos', img: 'friend3.jpg' }
  ];

  // Lista de fotos recentes para o template
  recentPhotos = [
    { title: 'Viagem Paris', img: 'Paris.jpg', description: 'Foto da Torre Eiffel em Paris' },
    { title: 'Festival Verão', img: 'feirasnovas.jpg', description: 'Festival de verão em Ponte de Lima' },
    { title: 'Praia Cabedelo', img: 'PraiadoCabedelo.jpg', description: 'Vista panorâmica da Praia do Cabedelo' }
  ];

  segmentValue = 'about';
  name = 'João Barbosa';
  birth = '1 de Agosto de 1996';
  location = 'Freixo, Ponte de Lima';
  bio =
    'Engenheiro Informático com foco em UX/UI e desenvolvimento mobile. Apaixonado por viagens e tecnologia.';

  skills: Skill[] = [
    { name: 'Angular', level: 'Avançado' },
    { name: 'Ionic', level: 'Avançado' },
    { name: 'TypeScript', level: 'Avançado' },
    { name: 'Figma', level: 'Intermédio' },
  ];

  languages: Language[] = [
    { name: 'Português', level: 'Nativo' },
    { name: 'Inglês', level: 'Fluente' },
    { name: 'Espanhol', level: 'Intermédio' },
  ];

  experiences: Experience[] = [
    {
      role: 'Sub-Gerente',
      company: 'JHB Internacional',
      period: '2020–2022',
      icon: 'briefcase-outline',
      description: 'Gestão de equipas e projetos internacionais.',
      tags: ['Gestão', 'Logística', 'Liderança'],
    },
    {
      role: 'Responsável de Obra',
      company: 'Navios Cruzeiro',
      period: '2022–2024',
      icon: 'boat-outline',
      description: 'Supervisão de obras e renovações em navios de cruzeiro.',
      tags: ['Construção', 'Supervisão', 'Marítimo'],
    },
  ];

  education: Education[] = [
    {
      degree: 'Licenciatura em Engenharia Informática',
      institution: 'Instituto Politécnico de Viana do Castelo',
      period: '2023-OnGoing',
      description: 'Foco em desenvolvimento de software e sistemas web.',
    },
  ];

  showFavorites: boolean = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private favoritesService: FavoritesService // Injetar o serviço de favoritos
  ) {}

  ngOnInit() {}

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  // Método que faltava para abrir configurações
  openSettings() {
    console.log('Abrindo configurações');
    // Implementação do método para abrir modal/página de configurações
  }

  // Método para editar imagem de perfil
  editProfileImage() {
    console.log('Editando imagem de perfil');
    // Implementação do método para editar imagem de perfil
  }

  editProfile() {
    console.log('Editar perfil');
    // Lógica para editar perfil será implementada aqui
  }

  segmentChanged() {
    console.log('Segmento alterado para:', this.segmentValue);
  }

  getSkillValue(level: string): number {
    switch (level) {
      case 'Básico':
        return 0.3;
      case 'Intermédio':
        return 0.6;
      case 'Avançado':
        return 0.85;
      case 'Especialista':
        return 1;
      default:
        return 0.5;
    }
  }

  getLanguageFlag(language: string): string {
    switch (language) {
      case 'Português':
        return 'pt';
      case 'Inglês':
        return 'en';
      case 'Espanhol':
        return 'es';
      default:
        return 'unknown';
    }
  }

  // Método para alternar entre visualização normal e de favoritos
  toggleFavorites() {
    this.showFavorites = !this.showFavorites;

    if (this.showFavorites) {
      this.presentToast('Visualizando seus favoritos');
    } else {
      this.presentToast('Voltando para perfil');
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
