import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserPreferencesService, ThemeConfig } from '../../services/user-preferences.service';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon,
  IonContent, 
  IonList, 
  IonListHeader, 
  IonLabel, 
  IonItem,
  IonSelect,
  IonSelectOption
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption
  ]
})
export class SettingsComponent implements OnInit {
  themeMode: string = 'system';
  
  constructor(
    private modalCtrl: ModalController,
    private userPreferencesService: UserPreferencesService
  ) { }

  ngOnInit() {
    // Determinar o tema atual
    this.userPreferencesService.themeConfig$.subscribe((config: ThemeConfig) => {
      if (config.darkMode === null) {
        this.themeMode = 'system';
      } else {
        this.themeMode = config.darkMode ? 'dark' : 'light';
      }
    });
  }

  // Fechar o modal
  closeModal() {
    this.modalCtrl.dismiss();
  }

  // Mudar o tema da aplicação
  changeTheme(event: CustomEvent) {
    const selectedValue = event.detail.value;
    
    if (selectedValue === 'system') {
      this.userPreferencesService.useSystemTheme();
    } else if (selectedValue === 'dark') {
      if (this.themeMode !== 'dark') {
        this.userPreferencesService.toggleDarkMode();
      }
    } else {
      if (this.themeMode === 'dark') {
        this.userPreferencesService.toggleDarkMode();
      }
    }
  }

  // Limpar todos os favoritos
  clearAllFavorites() {
    this.userPreferencesService.clearFavorites();
  }
}
