import { NgOptimizedImage } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-logo',
  styleUrls: ['logo.component.scss'],
  templateUrl: 'logo.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NgOptimizedImage
],
})
export class LogoComponent {

  logo = input.required<string>();
}
