import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotService, ChatMessage } from '../../services/chat-bot.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <!-- WhatsApp Float Button -->
    <div class="whatsapp-float" (click)="toggleChat()">
      <div class="whatsapp-float-button">
        <i class="fab fa-whatsapp"></i>
      </div>
      <span class="tooltip">Como posso ajudar?</span>
    </div>

    <!-- Chat Window -->
    <div class="chat-window" [class.open]="isOpen">
      <div class="chat-header">
        <div class="chat-title">
          <i class="fab fa-whatsapp"></i>
          <span>WhatsApp</span>
        </div>
        <button class="close-button" (click)="toggleChat()">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="chat-messages" #chatMessages>
        <div *ngFor="let message of messages" 
             class="message" 
             [class.bot]="message.isBot" 
             [class.user]="!message.isBot">
          <div class="message-content">
            <div *ngIf="message.isHtml" [innerHTML]="message.text | safeHtml"></div>
            <div *ngIf="!message.isHtml">{{ message.text }}</div>
          </div>
          
          <div *ngIf="message.options" class="message-options">
            <button *ngFor="let option of message.options"
                    (click)="selectOption(option.value, option.text)">
              {{ option.text }}
            </button>
          </div>
        </div>
      </div>

      <div class="chat-footer">
        <button class="reset-button" (click)="resetChat()">
          <i class="fas fa-redo"></i>
          Recomeçar conversa
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --whatsapp-color: #25D366;
      --whatsapp-shadow: rgba(37, 211, 102, 0.3);
    }

    .whatsapp-float {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        .tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        
        .whatsapp-float-button {
          transform: scale(1.1);
        }
      }
    }

    .whatsapp-float-button {
      width: 60px;
      height: 60px;
      background-color: var(--whatsapp-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px var(--whatsapp-shadow);
      transition: all 0.3s ease;

      i {
        font-size: 2.5rem;
        color: white;
      }
    }

    .tooltip {
      position: absolute;
      right: 75px;
      background-color: white;
      padding: 8px 15px;
      border-radius: 4px;
      font-size: 0.9rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      opacity: 0;
      transform: translateX(10px);
      transition: all 0.3s ease;
      white-space: nowrap;

      &:after {
        content: '';
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        border-left: 8px solid white;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }
    }

    .chat-window {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 999;

      &.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }

    .chat-header {
      padding: 15px;
      background-color: var(--whatsapp-color);
      color: white;
      border-radius: 10px 10px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .chat-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;

        i {
          font-size: 1.5rem;
        }
      }

      .close-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        
        &:hover {
          opacity: 0.8;
        }
      }
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background-color: #E8ECF0;
      display: flex;
      flex-direction: column;
      gap: 15px;

      .message {
        max-width: 80%;
        
        &.bot {
          align-self: flex-start;
          
          .message-content {
            background-color: white;
            color: #333;

            &.schedule {
              white-space: pre-line;
              font-family: monospace;
              line-height: 1.5;
              padding: 15px 20px;
              
              border-left: 4px solid var(--whatsapp-color);
              background-color: #f8f9fa;
            }
          }
        }
        
        &.user {
          align-self: flex-end;
          
          .message-content {
            background-color: #DCF8C6;
            color: #333;
          }
        }

        .message-content {
          padding: 12px 15px;
          border-radius: 15px;
          font-size: 0.95rem;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .message-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;

          button {
            background-color: white;
            border: none;
            color: var(--whatsapp-color);
            padding: 10px 15px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);

            &:hover {
              background-color: var(--whatsapp-color);
              color: white;
            }
          }
        }
      }
    }

    .chat-footer {
      padding: 15px;
      background-color: white;
      border-top: 1px solid #eee;
      border-radius: 0 0 10px 10px;

      .reset-button {
        width: 100%;
        padding: 10px;
        border: none;
        background-color: #f0f2f5;
        color: #666;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s ease;

        &:hover {
          background-color: #e4e6eb;
        }

        i {
          font-size: 0.9rem;
        }
      }
    }

    @media (max-width: 768px) {
      .chat-window {
        width: calc(100vw - 40px);
        height: calc(100vh - 100px);
        bottom: 90px;
      }

      .tooltip {
        display: none;
      }
    }
  `]
})
export class ChatBotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatMessages') private chatMessages!: ElementRef;
  
  isOpen = false;
  messages: ChatMessage[] = [];
  
  constructor(private chatBotService: ChatBotService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.messages = [this.chatBotService.getInitialMessage()];
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatMessages.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) { }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  selectOption(value: string, text: string): void {
    // Add user's selection to chat
    this.messages.push({
      text: text,
      isBot: false
    });

    // Get bot's response
    const response = this.chatBotService.getResponse(value);
    
    // If no more options, redirect to WhatsApp
    if (!response.options) {
      setTimeout(() => {
        this.messages.push(response);
        setTimeout(() => {
          this.chatBotService.redirectToWhatsApp(this.messages);
          this.resetChat();
        }, 1000);
      }, 500);
    } else {
      // Continue conversation
      setTimeout(() => {
        this.messages.push(response);
      }, 500);
    }

    // After adding new messages, force scroll
    setTimeout(() => this.scrollToBottom(), 0);
  }

  resetChat() {
    this.messages = [this.chatBotService.getInitialMessage()];
  }
} 