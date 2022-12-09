import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[appRoundNumber]' })
export class RoundNumberDirective {

  @Input()
  set appRoundNumber(value: any) {
    this.trimValue(value);
  }

  constructor(private el: ElementRef) { }

  private trimValue(value: any) {
    const replaced = typeof value === 'number' ? Number.parseFloat(value.toFixed(1).replace(/[.,]0$/, "")) : value;
    this.el.nativeElement.innerHTML = replaced;
  }
}
