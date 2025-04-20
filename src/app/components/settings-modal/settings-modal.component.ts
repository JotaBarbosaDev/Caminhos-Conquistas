import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { CommonModule } from '@angular/common';
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
  IonItem,
  IonLabel,
  IonToggle,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    IonItem,
    IonLabel,
    IonToggle,
    IonSegment,
    IonSegmentButton
  ]
})
export class SettingsModalComponent implements OnInit {
  currentTheme: 'light' | 'dark' | 'system' = 'system';
  notifications: boolean = true;
  emailNotifications: boolean = false;
  analytics: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private preferencesService: UserPreferencesService
  ) { }

  ngOnInit() {
    // Determinar o tema atual
    this.preferencesService.themeConfig$.subscribe(themeConfig => {
      if (themeConfig.darkMode === null) {
        this.currentTheme = 'system';
      } else {
        this.currentTheme = themeConfig.darkMode ? 'dark' : 'light';
      }
    });
    
    // Carregar preferências salvas para notificações e analytics
    const notificationSettings = localStorage.getItem('notification-settings');
    if (notificationSettings) {
      try {
        const settings = JSON.parse(notificationSettings);
        this.notifications = settings.enabled ?? true;
        this.emailNotifications = settings.email ?? false;
      } catch (error) {
        console.error('Erro ao carregar configurações de notificação:', error);
      }
    }
    
    const analyticsSettings = localStorage.getItem('analytics-settings');
    if (analyticsSettings) {
      try {
        const settings = JSON.parse(analyticsSettings);
        this.analytics = settings.enabled ?? true;
      } catch (error) {
        console.error('Erro ao carregar configurações de analytics:', error);
      }
    }
  }

  dismiss() {
    // Salvar configurações antes de fechar
    this.saveSettings();
    this.modalCtrl.dismiss();
  }
  
  onThemeChange(event: any) {
    const selectedTheme = event.detail.value;
    
    switch(selectedTheme) {
      case 'dark':
        this.preferencesService.setDarkMode(true);
        break;
      case 'light':
        this.preferencesService.setDarkMode(false);
        break;
      case 'system':
        this.preferencesService.setSystemTheme();
        break;
    }
    
    // Salvar a preferência de tema
    this.preferencesService.themeConfig$.subscribe(config => {
      localStorage.setItem('theme-preference', JSON.stringify(config));
    });
  }
  
  saveSettings() {
    // Salvar configurações de notificação
    localStorage.setItem('notification-settings', JSON.stringify({
      enabled: this.notifications,
      email: this.emailNotifications
    }));
    
    // Salvar configurações de analytics
    localStorage.setItem('analytics-settings', JSON.stringify({
      enabled: this.analytics
    }));
  }
  
  async showPrivacyPolicy() {
    const alert = await this.alertCtrl.create({
      header: 'Política de Privacidade',
      message: 'Este aplicativo de portfólio coleta dados mínimos para melhorar a experiência do usuário. Nenhum dado pessoal é coletado ou compartilhado com terceiros. Os dados locais são armazenados apenas no seu dispositivo para salvar suas preferências e favoritos.',
      buttons: ['OK']
    });
    
    await alert.present();
  }
  
  async confirmClearFavorites() {
    const alert = await this.alertCtrl.create({
      header: 'Limpar Favoritos',
      message: 'Tem certeza que deseja remover todos os itens favoritos? Esta ação não pode ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.clearFavorites();
          }
        }
      ]
    });
    
    await alert.present();
  }
  
  async clearFavorites() {
    // Limpar favoritos
    this.preferencesService.clearFavorites();
    
    const toast = await this.toastCtrl.create({
      message: 'Todos os favoritos foram removidos',
      duration: 2000,
      position: 'bottom'
    });
    
    await toast.present();
  }
  
  async confirmClearData() {
    const alert = await this.alertCtrl.create({
      header: 'Redefinir Aplicativo',
      message: 'Esta ação irá limpar todos os dados salvos, incluindo favoritos, preferências e configurações. O aplicativo será redefinido para o estado inicial. Tem certeza que deseja continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Redefinir',
          handler: () => {
            this.clearAllData();
          }
        }
      ]
    });
    
    await alert.present();
  }
  
  async clearAllData() {
    // Limpar todos os dados
    localStorage.clear();
    
    // Redefinir os observables do serviço de preferências
    this.preferencesService.setSystemTheme();
    this.preferencesService.clearFavorites();
    
    // Atualizar a interface
    this.currentTheme = 'system';
    this.notifications = true;
    this.emailNotifications = false;
    this.analytics = true;
    
    const toast = await this.toastCtrl.create({
      message: 'Aplicativo redefinido para as configurações padrão',
      duration: 2000,
      position: 'bottom'
    });
    
    await toast.present();
    
    // Fechar o modal após limpar
    this.modalCtrl.dismiss();
    
    // Forçar uma atualização completa da página
    window.location.reload();
  }
}
