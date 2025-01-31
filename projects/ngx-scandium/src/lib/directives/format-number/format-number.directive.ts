import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appFormatNumber]',
})
export class FormatNumberDirective {
  private el = inject(ElementRef);

  @Input()
  set appFormatNumber(value: number | string) {
    this.trimValue(value);
  }

  private trimValue(value: number | string) {
    const replaced = typeof value === 'number' ? Number.parseFloat(value.toFixed(2)) : value;
    this.el.nativeElement.innerHTML = replaced;
  }
}
