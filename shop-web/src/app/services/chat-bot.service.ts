import { Injectable } from '@angular/core';

export interface ChatMessage {
  text: string;
  isBot: boolean;
  options?: ChatOption[];
  isSchedule?: boolean;
  isHtml?: boolean;
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
      options: [
        { text: 'Voltar ao Menu', value: 'initial' },
        { text: 'Falar com Atendente', value: 'contact' }
      ]
    },
    'initial': this.INITIAL_MESSAGE,
    'support': {
      text: 'Qual tipo de suporte você precisa?',
      isBot: true,
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
      isBot: true
    };
  }

  redirectToWhatsApp(conversation: ChatMessage[]): void {
    const message = this.formatWhatsAppMessage(conversation);
    const url = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  private formatWhatsAppMessage(conversation: ChatMessage[]): string {
    const userSelections = conversation
      .filter(msg => !msg.isBot)
      .map(msg => msg.text)
      .join('\n- ');

    return `Olá! Gostaria de atendimento sobre:\n- ${userSelections}`;
  }

  private getScheduleMessage(): ChatMessage {
    return {
      text: this.SCHEDULE_HTML,
      isBot: true,
      isHtml: true
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