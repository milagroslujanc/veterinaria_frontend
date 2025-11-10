import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatWeight',
  standalone: true
})
export class FormatWeightPipe implements PipeTransform {
  transform(value: number | string | null | undefined, unit: string = 'kg'): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) {
      return value.toString();
    }

    // Formatear con 2 decimales
    const formatted = numValue.toFixed(2);
    
    // Eliminar ceros innecesarios al final
    const cleanValue = parseFloat(formatted).toString();
    
    return `${cleanValue} ${unit}`;
  }
}

