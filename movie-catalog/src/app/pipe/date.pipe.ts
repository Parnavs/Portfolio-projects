import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullDate',
})
export class DatePipe implements PipeTransform {
  transform(value: string): string | null {
    if (!value) return null;

    const dateParts = value.split('-');
    if (dateParts.length !== 3) return null;

    const year = dateParts[0];
    const month = this.getMonthName(dateParts[1]);
    const day = this.formatDay(dateParts[2]);

    return `${day} ${month} ${year}`;
  }

  private getMonthName(monthIndex: string): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const index = parseInt(monthIndex, 10) - 1;
    return months[index] || 'Invalid month';
  }

  private formatDay(day: string): string {
    return day.startsWith('0') ? day.substring(1) : day;
  }
}
