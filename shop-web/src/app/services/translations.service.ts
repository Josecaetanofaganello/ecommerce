import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'pt-BR' | 'en';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const TRANSLATIONS: Translations = {
  'pt-BR': {
    'NAV.HOME': 'Home',
    'NAV.COMPANY': 'Empresa',
    'NAV.SERVICES': 'Serviços',
    'NAV.PRODUCTS': 'Produtos',
    'NAV.PARTNERS': 'Parceiros',
    'NAV.CONTACT': 'Contato',
    'NAV.NEWS': 'Notícias',
    'SEARCH.PLACEHOLDER': 'Buscar resultados para...',
    'NAV.ACCOUNT': 'Minha Conta',
    'NAV.CART': 'Carrinho',
    'NAV.LANGUAGE': 'Idioma',
    'PRODUCTS.TITLE': 'Nossos Produtos',
    'PRODUCTS.SEARCH': 'Buscar produtos...',
    'PRODUCTS.PRICE': 'Preço',
    'PRODUCTS.ADD_TO_CART': 'Adicionar ao Carrinho',
    'FOOTER.ABOUT': 'Sua loja completa de tecnologia e serviços de reparo.',
    'FOOTER.QUICK_LINKS': 'Links Rápidos',
    'FOOTER.CONTACT': 'Contato',
    'FOOTER.RIGHTS': 'Todos os direitos reservados.',
    'FOOTER.PRIVACY': 'Política de Privacidade',
    'FOOTER.TERMS': 'Termos de Uso',
    'FOOTER.FOLLOW_US': 'Redes Sociais',
    'HERO.TITLE': 'Soluções Completas em Informática',
    'HERO.SUBTITLE': 'Oferecemos serviços especializados e produtos de alta qualidade',
    'HERO.BUTTON': 'Saiba Mais',
    'SERVICES.TITLE': 'Nossos Serviços',
    'SERVICES.REPAIR.TITLE': 'Manutenção e Reparo',
    'SERVICES.REPAIR.DESCRIPTION': 'Serviços especializados de manutenção para computadores e notebooks',
    'SERVICES.SALES.TITLE': 'Venda de Equipamentos',
    'SERVICES.SALES.DESCRIPTION': 'Computadores, notebooks e periféricos das melhores marcas',
    'SERVICES.NETWORK.TITLE': 'Redes e Infraestrutura',
    'SERVICES.NETWORK.DESCRIPTION': 'Soluções completas para sua rede empresarial',
    'FEATURES.TITLE': 'Por que nos escolher',
    'FEATURES.EXPERIENCE': '25 Anos de Experiência',
    'FEATURES.QUALITY': 'Qualidade Garantida',
    'FEATURES.SUPPORT': 'Suporte 24/7',
    'FEATURES.WARRANTY': 'Garantia em Todos os Serviços',
    'PARTNERS.TITLE': 'Nossos Parceiros'
  },
  'en': {
    'NAV.HOME': 'Home',
    'NAV.COMPANY': 'Company',
    'NAV.SERVICES': 'Services',
    'NAV.PRODUCTS': 'Products',
    'NAV.PARTNERS': 'Partners',
    'NAV.CONTACT': 'Contact',
    'NAV.NEWS': 'News',
    'SEARCH.PLACEHOLDER': 'Search for...',
    'NAV.ACCOUNT': 'My Account',
    'NAV.CART': 'Cart',
    'NAV.LANGUAGE': 'Language',
    'PRODUCTS.TITLE': 'Our Products',
    'PRODUCTS.SEARCH': 'Search products...',
    'PRODUCTS.PRICE': 'Price',
    'PRODUCTS.ADD_TO_CART': 'Add to Cart',
    'FOOTER.ABOUT': 'Your complete technology and repair services store.',
    'FOOTER.QUICK_LINKS': 'Quick Links',
    'FOOTER.CONTACT': 'Contact',
    'FOOTER.RIGHTS': 'All rights reserved.',
    'FOOTER.PRIVACY': 'Privacy Policy',
    'FOOTER.TERMS': 'Terms of Use',
    'FOOTER.FOLLOW_US': 'Follow Us',
    'HERO.TITLE': 'Complete IT Solutions',
    'HERO.SUBTITLE': 'We offer specialized services and high-quality products',
    'HERO.BUTTON': 'Learn More',
    'SERVICES.TITLE': 'Our Services',
    'SERVICES.REPAIR.TITLE': 'Maintenance & Repair',
    'SERVICES.REPAIR.DESCRIPTION': 'Specialized maintenance services for computers and laptops',
    'SERVICES.SALES.TITLE': 'Equipment Sales',
    'SERVICES.SALES.DESCRIPTION': 'Computers, laptops and peripherals from top brands',
    'SERVICES.NETWORK.TITLE': 'Network & Infrastructure',
    'SERVICES.NETWORK.DESCRIPTION': 'Complete solutions for your business network',
    'FEATURES.TITLE': 'Why Choose Us',
    'FEATURES.EXPERIENCE': '25 Years Experience',
    'FEATURES.QUALITY': 'Guaranteed Quality',
    'FEATURES.SUPPORT': '24/7 Support',
    'FEATURES.WARRANTY': 'Warranty on All Services',
    'PARTNERS.TITLE': 'Our Partners'
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  private currentLang = new BehaviorSubject<Language>('pt-BR');
  currentLang$ = this.currentLang.asObservable();

  constructor() {}

  setLanguage(lang: Language) {
    this.currentLang.next(lang);
  }

  getCurrentLanguage(): Language {
    return this.currentLang.value;
  }

  translate(key: string): string {
    return TRANSLATIONS[this.currentLang.value][key] || key;
  }
} 