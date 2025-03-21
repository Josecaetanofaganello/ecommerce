import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { PartnersComponent } from './components/partners/partners.component';
import { MapsButtonComponent } from './components/maps-button/maps-button.component';
import { ReviewButtonComponent } from './components/review-button/review-button.component';
import { GoogleReviewsComponent } from './components/google-reviews/google-reviews.component';
import { DownloadsComponent } from './components/downloads/downloads.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ChatBotComponent,
    PartnersComponent,
    MapsButtonComponent,
    ReviewButtonComponent,
    GoogleReviewsComponent,
    DownloadsComponent
  ],
  template: `
    <app-header></app-header>
    <app-body></app-body>
    <app-google-reviews></app-google-reviews>
    <app-downloads></app-downloads>
    <app-footer></app-footer>
    <app-maps-button></app-maps-button>
    <app-chat-bot></app-chat-bot>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {} 