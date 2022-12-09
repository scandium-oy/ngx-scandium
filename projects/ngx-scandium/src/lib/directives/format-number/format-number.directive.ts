import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[appFormatNumber]' })
export class FormatNumberDirective {

  @Input()
  set appFormatNumber(value: any) {
    this.trimValue(value);
  }

  constructor(private el: ElementRef) { }

  private trimValue(value: any) {
    const replaced = typeof value === 'number' ? value.toFixed(2) : value;
    this.el.nativeElement.innerHTML = replaced;
  }
}
