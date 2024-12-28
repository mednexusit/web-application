import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ThememanageService {

  private renderer: Renderer2;
  private currentTheme: 'light-theme' | 'dark-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const savedTheme = sessionStorage.getItem('theme') as 'light-theme' | 'dark-theme';
    this.currentTheme = savedTheme ? savedTheme : 'light-theme';
    this.renderer.addClass(document.body, this.currentTheme);
  }

  toggleTheme(isDarkTheme: boolean) {
    const theme: 'light-theme' | 'dark-theme' = isDarkTheme ? 'dark-theme' : 'light-theme';
    this.setTheme(theme);
    sessionStorage.setItem('theme', theme);
  }

  private setTheme(theme: 'light-theme' | 'dark-theme') {
    if (this.currentTheme === theme) {
      return;
    }
    const body = document.body;
    if (this.currentTheme) {
      this.renderer.removeClass(body, this.currentTheme);
    }
    this.renderer.addClass(body, theme);
    this.currentTheme = theme;
  }

  getLogo(): string {
    return this.currentTheme === 'dark-theme' ? '../../../../../assets/new-logo.png' : '../../../../../assets/new-logo.png';
  }
  getUserLogo(): string {
    return this.currentTheme === 'dark-theme' ? '../../../../../assets/user-dark.svg' : '../../../../../assets/user-light.svg';
  }
  getToggleLogo(): string {
    return this.currentTheme === 'dark-theme' ? '../../../../../assets/theme-toggle-dark.svg' : '../../../../../assets/theme-toggle-light.svg';
  }
  getHomeIcon(): string {
    return this.currentTheme === 'dark-theme' ? '../../../../../assets/home-dark.svg' : '../../../../../assets/home-light.svg';
  }
  getAboutIcon(): string {
    return this.currentTheme === 'dark-theme' ? '../../../../../assets/about-dark.svg' : '../../../../../assets/about-light.svg';
  }
  getCommIcon(): string {
    return this.currentTheme === 'dark-theme' ? '../../../../../assets/community-dark.svg' : '../../../../../assets/community-light.svg';
  }
  getConfIcon(): string {
    return this.currentTheme === 'dark-theme' ? '../../../../../assets/conference-dark.svg' : '../../../../../assets/conference.svg';
  }
  getEduIcon(): string {
    return this.currentTheme === 'dark-theme' ? '../../../../../assets/education-dark.svg' : '../../../../../assets/education.svg';
  }
  getContactIcon(): string {
    return this.currentTheme === 'dark-theme' ? '../../../../../assets/contact-dark.svg' : '../../../../../assets/contact.svg';
  }
}
