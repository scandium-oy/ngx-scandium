import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-logo',
  styleUrls: ['logo.component.scss'],
  templateUrl: 'logo.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
})
export class LogoComponent {

  logo = input.required<string>();
}
