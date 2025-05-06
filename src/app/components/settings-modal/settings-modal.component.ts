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
    this.preferencesService.themeConfig$.subscribe(themeConfig => {
      if (themeConfig.darkMode === null) {
        this.currentTheme = 'system';
      } else {
        this.currentTheme = themeConfig.darkMode ? 'dark' : 'light';
      }
    });
    
    const notificationSettings = localStorage.getItem('notification-settings');
    if (notificationSettings) {
      try {
        const settings = JSON.parse(notificationSettings);
        this.notifications = settings.enabled ?? true;
        this.emailNotifications = settings.email ?? false;
      } catch (error) {
        console.error('Erro ao carregar definições de notificação:', error);
      }
    }
    
    const analyticsSettings = localStorage.getItem('analytics-settings');
    if (analyticsSettings) {
      try {
        const settings = JSON.parse(analyticsSettings);
        this.analytics = settings.enabled ?? true;
      } catch (error) {
        console.error('Erro ao carregar definições de analytics:', error);
      }
    }
  }

  dismiss() {
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
    
    this.preferencesService.themeConfig$.subscribe(config => {
      localStorage.setItem('theme-preference', JSON.stringify(config));
    });
  }
  
  saveSettings() {
    localStorage.setItem('notification-settings', JSON.stringify({
      enabled: this.notifications,
      email: this.emailNotifications
    }));
    
    localStorage.setItem('analytics-settings', JSON.stringify({
      enabled: this.analytics
    }));
  }
  
  async showPrivacyPolicy() {
    const alert = await this.alertCtrl.create({
      header: 'Política de Privacidade',
      message: 'Esta aplicação de portfólio recolhe dados mínimos para melhorar a experiência do utilizador. Nenhum dado pessoal é recolhido ou partilhado com terceiros. Os dados locais são armazenados apenas no seu dispositivo para guardar as suas preferências e favoritos.',
      buttons: ['OK']
    });
    
    await alert.present();
  }
  
  async confirmClearFavorites() {
    const alert = await this.alertCtrl.create({
      header: 'Limpar Favoritos',
      message: 'Tem a certeza que deseja remover todos os itens favoritos? Esta ação não pode ser desfeita.',
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
      header: 'Redefinir Aplicação',
      message: 'Esta ação irá limpar todos os dados guardados, incluindo favoritos, preferências e definições. A aplicação será redefinida para o estado inicial. Tem a certeza que deseja continuar?',
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
    localStorage.clear();
    
    this.preferencesService.setSystemTheme();
    this.preferencesService.clearFavorites();
    
    this.currentTheme = 'system';
    this.notifications = true;
    this.emailNotifications = false;
    this.analytics = true;
    
    const toast = await this.toastCtrl.create({
      message: 'Aplicação redefinida para as definições padrão',
      duration: 2000,
      position: 'bottom'
    });
    
    await toast.present();
    
    this.modalCtrl.dismiss();
    
    window.location.reload();
  }
}
