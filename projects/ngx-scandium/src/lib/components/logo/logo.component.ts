import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  styleUrls: ['logo.component.scss'],
  templateUrl: 'logo.component.html',
})
export class LogoComponent {

  @Input()
  logo: string = '';
}
