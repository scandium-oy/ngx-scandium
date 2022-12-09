import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoundNumberDirective } from './round-number.directive';

@NgModule({
  declarations: [RoundNumberDirective],
  imports: [
    CommonModule,
  ],
  exports: [RoundNumberDirective],
})
export class RoundNumberModule { }
