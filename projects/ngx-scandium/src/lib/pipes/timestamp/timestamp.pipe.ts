import { Pipe, PipeTransform } from '@angular/core';
import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { format, parse } from 'date-fns';
import { isDate } from 'date-fns/isDate';

const isTimestamp = (object: any): object is Timestamp => {
  if (object == null || typeof object === 'string') {
    return false;
  }
  return 'toDate' in object;
};

@Pipe({
  standalone: true,
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {

  transform(value: Timestamp | Date | FieldValue | string, outFormat: string): string {
    if (value == null) {
      return '';
    }
    if (typeof value === 'string') {
      if (value.includes('.') && !value.includes('T')) {
        const formatted = parse(value, 'd.M.yyyy', new Date());
        return format(formatted, outFormat);
      }
      const date = new Date(value);
      return format(date, outFormat);
    }
    if (isTimestamp(value)) {
      const date = value.toDate();
      return format(date, outFormat);
    } else if (isDate(value)) {
      return format(value, outFormat);
    } else {
      if (typeof value !== 'string' && '_seconds' in value && '_nanoseconds' in value) {
        const date = new Date((value._seconds as number) * 1000 + (value._nanoseconds as number) / 1000000);
        return format(date, outFormat);
      }
      return '';
    }
  }
}
