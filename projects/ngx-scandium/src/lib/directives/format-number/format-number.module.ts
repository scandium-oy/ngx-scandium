import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatNumberDirective } from './format-number.directive';

@NgModule({
  declarations: [FormatNumberDirective],
  imports: [
    CommonModule,
  ],
  exports: [FormatNumberDirective],
})
export class FormatNumberModule { }
