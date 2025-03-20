import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected t = inject(TranslationsService);
  protected currentYear = new Date().getFullYear();
} 