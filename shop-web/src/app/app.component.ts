import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ChatBotComponent
  ],
  template: `
    <app-header></app-header>
    <app-body></app-body>
    <app-footer></app-footer>
    <app-chat-bot></app-chat-bot>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {} 