import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

export interface ThemeConfig {
  darkMode: boolean | null; // null = usar tema do sistema
}

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  // Armazenamento de preferências de tema
  private themeConfigSubject = new BehaviorSubject<ThemeConfig>({ darkMode: null });
  public themeConfig$ = this.themeConfigSubject.asObservable();

  // Armazenamento de projetos favoritos
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  // Chaves para o localStorage
  private readonly THEME_KEY = 'portfolio_theme';
  private readonly FAVORITES_KEY = 'portfolio_favorites';

  // Detector de tema do sistema
  private darkModeMediaQuery: MediaQueryList;
  
  constructor(private platform: Platform) {
    // Inicializar o média query para detecção do tema do sistema
    this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Carregar preferências salvas
    this.loadSavedPreferences();
    
    // Configurar listener para mudanças no tema do sistema
    this.darkModeMediaQuery.addEventListener('change', (e) => {
      if (this.themeConfigSubject.value.darkMode === null) {
        this.applyTheme(e.matches);
      }
    });
  }

  private loadSavedPreferences() {
    // Carregar tema
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.themeConfigSubject.next(JSON.parse(savedTheme));
    }
    
    // Aplicar o tema correto
    this.applyCurrentTheme();
    
    // Carregar favoritos
    const savedFavorites = localStorage.getItem(this.FAVORITES_KEY);
    if (savedFavorites) {
      this.favoritesSubject.next(JSON.parse(savedFavorites));
    }
  }

  private applyCurrentTheme() {
    const themeConfig = this.themeConfigSubject.value;
    let isDark: boolean;
    
    if (themeConfig.darkMode === null) {
      // Usar tema do sistema
      isDark = this.darkModeMediaQuery.matches;
    } else {
      isDark = themeConfig.darkMode;
    }
    
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean) {
    // Aplicar classe ao elemento raiz (document.body)
    document.body.classList.toggle('dark', isDark);
  }

  // Alternar entre tema claro e escuro
  toggleDarkMode() {
    const currentConfig = this.themeConfigSubject.value;
    const newDarkMode = currentConfig.darkMode === null ? 
      !this.darkModeMediaQuery.matches : 
      !currentConfig.darkMode;
    
    const newConfig: ThemeConfig = {
      darkMode: newDarkMode
    };
    
    this.themeConfigSubject.next(newConfig);
    this.applyTheme(newDarkMode);
    
    // Salvar a preferência
    localStorage.setItem(this.THEME_KEY, JSON.stringify(newConfig));
  }

  // Definir o modo escuro explicitamente
  setDarkMode(isDark: boolean) {
    const newConfig: ThemeConfig = {
      darkMode: isDark
    };
    
    this.themeConfigSubject.next(newConfig);
    this.applyTheme(isDark);
    
    // Salvar a preferência
    localStorage.setItem(this.THEME_KEY, JSON.stringify(newConfig));
  }

  // Usar tema do sistema
  useSystemTheme() {
    const newConfig: ThemeConfig = {
      darkMode: null
    };
    
    this.themeConfigSubject.next(newConfig);
    this.applyTheme(this.darkModeMediaQuery.matches);
    
    // Salvar a preferência
    localStorage.setItem(this.THEME_KEY, JSON.stringify(newConfig));
  }

  // Alias para useSystemTheme para manter compatibilidade com o código existente
  setSystemTheme() {
    this.useSystemTheme();
  }

  // Gerenciamento de favoritos
  toggleFavorite(projectId: string): boolean {
    const currentFavorites = [...this.favoritesSubject.value];
    const index = currentFavorites.indexOf(projectId);
    
    let wasAdded = false;
    
    if (index > -1) {
      // Remover dos favoritos
      currentFavorites.splice(index, 1);
      wasAdded = false;
    } else {
      // Adicionar aos favoritos
      currentFavorites.push(projectId);
      wasAdded = true;
    }
    
    this.favoritesSubject.next(currentFavorites);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(currentFavorites));
    
    return wasAdded;
  }

  // Verificar se um projeto está nos favoritos
  isFavorite(projectId: string): boolean {
    return this.favoritesSubject.value.includes(projectId);
  }

  // Limpar todos os favoritos
  clearFavorites() {
    this.favoritesSubject.next([]);
    localStorage.removeItem(this.FAVORITES_KEY);
  }
}
