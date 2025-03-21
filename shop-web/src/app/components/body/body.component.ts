import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsService } from '../../services/translations.service';
import { PartnersComponent } from '../partners/partners.component';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, PartnersComponent],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  protected t = inject(TranslationsService);
} 