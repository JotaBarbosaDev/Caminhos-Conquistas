import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

export interface ThemeConfig {
  darkMode: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private themeConfigSubject = new BehaviorSubject<ThemeConfig>({ darkMode: null });
  public themeConfig$ = this.themeConfigSubject.asObservable();

  private favoritesSubject = new BehaviorSubject<string[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  private readonly THEME_KEY = 'portfolio_theme';
  private readonly FAVORITES_KEY = 'portfolio_favorites';

  private darkModeMediaQuery: MediaQueryList;
  
  constructor(private platform: Platform) {
    this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.loadSavedPreferences();
    
    this.darkModeMediaQuery.addEventListener('change', (e) => {
      if (this.themeConfigSubject.value.darkMode === null) {
        this.applyTheme(e.matches);
      }
    });
  }

  private loadSavedPreferences() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.themeConfigSubject.next(JSON.parse(savedTheme));
    }
    
    this.applyCurrentTheme();
    
    const savedFavorites = localStorage.getItem(this.FAVORITES_KEY);
    if (savedFavorites) {
      this.favoritesSubject.next(JSON.parse(savedFavorites));
    }
  }

  private applyCurrentTheme() {
    const themeConfig = this.themeConfigSubject.value;
    let isDark: boolean;
    
    if (themeConfig.darkMode === null) {
      isDark = this.darkModeMediaQuery.matches;
    } else {
      isDark = themeConfig.darkMode;
    }
    
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
  }

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
    
    localStorage.setItem(this.THEME_KEY, JSON.stringify(newConfig));
  }

  setDarkMode(isDark: boolean) {
    const newConfig: ThemeConfig = {
      darkMode: isDark
    };
    
    this.themeConfigSubject.next(newConfig);
    this.applyTheme(isDark);
    
    localStorage.setItem(this.THEME_KEY, JSON.stringify(newConfig));
  }

  useSystemTheme() {
    const newConfig: ThemeConfig = {
      darkMode: null
    };
    
    this.themeConfigSubject.next(newConfig);
    this.applyTheme(this.darkModeMediaQuery.matches);
    
    localStorage.setItem(this.THEME_KEY, JSON.stringify(newConfig));
  }

  setSystemTheme() {
    this.useSystemTheme();
  }

  toggleFavorite(projectId: string): boolean {
    const currentFavorites = [...this.favoritesSubject.value];
    const index = currentFavorites.indexOf(projectId);
    
    let wasAdded = false;
    
    if (index > -1) {
      currentFavorites.splice(index, 1);
      wasAdded = false;
    } else {
      currentFavorites.push(projectId);
      wasAdded = true;
    }
    
    this.favoritesSubject.next(currentFavorites);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(currentFavorites));
    
    return wasAdded;
  }

  isFavorite(projectId: string): boolean {
    return this.favoritesSubject.value.includes(projectId);
  }

  clearFavorites() {
    this.favoritesSubject.next([]);
    localStorage.removeItem(this.FAVORITES_KEY);
  }
}
