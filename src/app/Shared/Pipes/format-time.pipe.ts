import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {
  transform(value: string | null | undefined, format: string = '12h'): string {
    if (!value) {
      return '';
    }

    try {
      // Formato esperado: HH:MM o HH:MM:SS
      const parts = value.split(':');
      if (parts.length < 2) {
        return value;
      }

      const hours = parseInt(parts[0], 10);
      const minutes = parts[1];

      if (isNaN(hours) || hours < 0 || hours > 23) {
        return value;
      }

      if (format === '12h') {
        // Formato 12 horas con AM/PM
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        return `${displayHours.toString().padStart(2, '0')}:${minutes} ${period}`;
      } else {
        // Formato 24 horas
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
      }
    } catch {
      return value;
    }
  }
}

