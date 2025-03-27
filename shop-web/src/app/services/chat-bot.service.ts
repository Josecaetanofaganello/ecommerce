import { Injectable } from '@angular/core';

export interface ChatMessage {
  text: string;
  isBot: boolean;
  options?: ChatOption[];
  isSchedule?: boolean;
  isHtml?: boolean;
  category?: string;  // Add category to track message context
  userSelection?: boolean;  // Flag to indicate if this is a user selection
}

export interface ChatOption {
  text: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  private readonly WHATSAPP_NUMBER = '556635449553'; // Replace with your WhatsApp number
  
  private readonly INITIAL_MESSAGE: ChatMessage = {
    text: 'Olá! Como posso ajudar você hoje?',
    isBot: true,
    options: [
      { text: 'Horário de Funcionamento', value: 'schedule' },
      { text: 'Suporte Técnico', value: 'support' },
      { text: 'Vendas', value: 'sales' },
      { text: 'Orçamento', value: 'quote' },
      { text: 'Outros Assuntos', value: 'other' }
    ]
  };

  private readonly SCHEDULE_HTML = `
    <div class="schedule-container">
      <h3>🕒 Nosso Horário de Funcionamento</h3>
      
      <div class="schedule-item">
        <span class="day">Segunda a Sexta:</span>
        <span class="hours">08:00 - 18:00</span>
      </div>
      
      <div class="schedule-item">
        <span class="day">Sábado:</span>
        <span class="hours">09:00 - 13:00</span>
      </div>
      
      <div class="schedule-item">
        <span class="day">Domingo:</span>
        <span class="hours">Fechado</span>
      </div>

      <div class="note">
        <p>✨ Estamos sempre prontos para atendê-lo!</p>
        <p>📞 Para emergências, entre em contato via WhatsApp.</p>
      </div>
    </div>
  `;

  private readonly RESPONSES: { [key: string]: ChatMessage } = {
    'schedule': {
      text: this.SCHEDULE_HTML,
      isBot: true,
      isSchedule: true,
      isHtml: true,
      category: 'schedule',
      options: [
        { text: 'Voltar ao Menu', value: 'initial' },
        { text: 'Falar com Atendente', value: 'contact' }
      ]
    },
    'initial': this.INITIAL_MESSAGE,
    'support': {
      text: 'Qual tipo de suporte você precisa?',
      isBot: true,
      category: 'support',
      options: [
        { text: 'Computador', value: 'pc_support' },
        { text: 'Notebook', value: 'laptop_support' },
        { text: 'Rede', value: 'network_support' },
        { text: 'Outro', value: 'other_support' }
      ]
    },
    'sales': {
      text: 'O que você gostaria de comprar?',
      isBot: true,
      category: 'sales',
      options: [
        { text: 'Computadores', value: 'pc_sales' },
        { text: 'Notebooks', value: 'laptop_sales' },
        { text: 'Peças', value: 'parts_sales' },
        { text: 'Periféricos', value: 'peripherals_sales' }
      ]
    },
    'quote': {
      text: 'Que tipo de orçamento você precisa?',
      isBot: true,
      category: 'quote',
      options: [
        { text: 'Montagem de PC', value: 'pc_quote' },
        { text: 'Serviços', value: 'service_quote' },
        { text: 'Upgrades', value: 'upgrade_quote' }
      ]
    }
  };

  getInitialMessage(): ChatMessage {
    return this.INITIAL_MESSAGE;
  }

  getResponse(option: string): ChatMessage {
    return this.RESPONSES[option] || {
      text: 'Vou te conectar com um atendente.',
      isBot: true,
      category: 'contact'
    };
  }

  redirectToWhatsApp(conversation: ChatMessage[]): void {
    const message = this.formatWhatsAppMessage(conversation);
    const url = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  private formatWhatsAppMessage(conversation: ChatMessage[]): string {
    // Get the main category from the first user selection
    const mainCategory = this.findMainCategory(conversation);
    
    // Get only the relevant user selections based on the category
    const relevantSelections = conversation
      .filter(msg => !msg.isBot && this.isRelevantMessage(msg, mainCategory))
      .map(msg => msg.text);

    // Format the message based on the category
    let message = 'Olá! ';
    
    switch (mainCategory) {
      case 'support':
        message += 'Preciso de suporte técnico para: ';
        break;
      case 'sales':
        message += 'Tenho interesse em comprar: ';
        break;
      case 'quote':
        message += 'Gostaria de um orçamento para: ';
        break;
      default:
        message += 'Gostaria de informações sobre: ';
    }

    return message + relevantSelections.join(' > ');
  }

  private findMainCategory(conversation: ChatMessage[]): string {
    // Find the first user selection that has a category
    const firstSelection = conversation.find(msg => !msg.isBot && this.getCategoryFromSelection(msg.text));
    return firstSelection ? this.getCategoryFromSelection(firstSelection.text) : 'other';
  }

  private getCategoryFromSelection(text: string): string {
    // Map the selection text to a category
    if (text.toLowerCase().includes('suporte')) return 'support';
    if (text.toLowerCase().includes('comprar') || text.toLowerCase().includes('vendas')) return 'sales';
    if (text.toLowerCase().includes('orçamento')) return 'quote';
    if (text.toLowerCase().includes('horário')) return 'schedule';
    return 'other';
  }

  private isRelevantMessage(message: ChatMessage, mainCategory: string): boolean {
    // Check if the message is relevant to the main category
    const messageCategory = this.getCategoryFromSelection(message.text);
    return messageCategory === mainCategory || messageCategory === 'other';
  }

  private getScheduleMessage(): ChatMessage {
    return {
      text: this.SCHEDULE_HTML,
      isBot: true,
      isHtml: true,
      category: 'schedule'
    };
  }

  handleScheduleOption(): ChatMessage {
    return this.getScheduleMessage();
  }

  handleMessage(option: string): ChatMessage {
    switch (option) {
      case 'schedule':
        return this.getScheduleMessage();
      default:
        return this.getResponse(option);
    }
  }
}