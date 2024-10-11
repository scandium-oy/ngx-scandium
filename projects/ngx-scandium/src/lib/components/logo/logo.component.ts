import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  styleUrls: ['logo.component.scss'],
  templateUrl: 'logo.component.html',
})
export class LogoComponent {

  logo = input.required<string>();
}
