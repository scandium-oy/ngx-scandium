import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'postalCode' })
export class PostalCodePipe implements PipeTransform {

  transform(value: number | string): string {
    const str = value.toString();
    if (str.length === 3) {
      return `00${value}`
    } else if (str.length === 4) {
      return `0${value}`;
    }
    return str;
  }
}
