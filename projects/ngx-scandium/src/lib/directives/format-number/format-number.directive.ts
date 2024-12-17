import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appFormatNumber]',
})
export class FormatNumberDirective {

  @Input()
  set formatNumber(value: number | string) {
    this.trimValue(value);
  }

  constructor(private el: ElementRef) {

  }

  private trimValue(value: number | string) {
    const replaced = typeof value === 'number' ? Number.parseFloat(value.toFixed(2)) : value;
    this.el.nativeElement.innerHTML = replaced;
  }
}
