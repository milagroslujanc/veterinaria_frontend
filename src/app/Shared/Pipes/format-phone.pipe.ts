import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
  standalone: true
})
export class FormatPhonePipe implements PipeTransform {
  transform(value: string | null | undefined, format: string = 'peru'): string {
    if (!value) {
      return '';
    }

    // Eliminar caracteres no numéricos
    const digits = value.replace(/\D/g, '');

    if (format === 'peru') {
      // Formato peruano: 9XXX-XXXX o XXX-XXXX
      if (digits.length === 9) {
        return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5)}`;
      } else if (digits.length === 8) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
      }
    } else if (format === 'international') {
      // Formato internacional: +51 9XX XXX XXX
      if (digits.length === 9) {
        return `+51 ${digits.slice(0, 1)} ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
      }
    }

    // Si no coincide con ningún formato, retornar original
    return value;
  }
}

