import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithCommas'
})
export class NumberWithCommasPipe implements PipeTransform {

  transform(value: number | string): string {
      if (!value && value !== 0) return '';
  
      const num = typeof value === 'number' ? value : parseFloat(value);
      if (isNaN(num)) return '';
  
      return num.toLocaleString('en-US');
    }
  }
    