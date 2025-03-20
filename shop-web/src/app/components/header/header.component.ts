import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsService, Language } from '../../services/translations.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected t = inject(TranslationsService);
  isLanguageMenuOpen = false;

  @HostListener('document:click', ['$event'])
  closeLanguageMenu(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.isLanguageMenuOpen = false;
    }
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  switchLang(lang: Language, event: Event) {
    event.preventDefault();
    this.t.setLanguage(lang);
    this.isLanguageMenuOpen = false;
  }

  getCurrentLanguageLabel(): string {
    return this.t.getCurrentLanguage() === 'pt-BR' ? 'Português' : 'English';
  }

  getCurrentLanguageFlag(): string {
    return this.t.getCurrentLanguage() === 'pt-BR' 
      ? 'assets/images/flags/br.png' 
      : 'assets/images/flags/eng.png';
  }
} 