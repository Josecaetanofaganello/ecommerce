import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>{{ t.translate('PRODUCTS.TITLE') }}</h2>
      <input 
        type="text" 
        class="form-control" 
        [placeholder]="t.translate('PRODUCTS.SEARCH')"
      >
      <!-- Product list content -->
    </div>
  `
})
export class ProductListComponent {
  protected t = inject(TranslationsService);
} 