import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostalCodePipe } from './postal-code.pipe';

@NgModule({
  declarations: [PostalCodePipe],
  imports: [
    CommonModule,
  ],
  exports: [PostalCodePipe],
  providers: [PostalCodePipe],
})
export class PostalCodeModule { }
