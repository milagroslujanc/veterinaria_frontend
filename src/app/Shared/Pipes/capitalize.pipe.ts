import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | null | undefined, mode: 'first' | 'words' | 'all' = 'first'): string {
    if (!value) {
      return '';
    }

    switch (mode) {
      case 'first':
        // Solo la primera letra en mayúscula
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      
      case 'words':
        // Primera letra de cada palabra en mayúscula
        return value
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      
      case 'all':
        // Todo en mayúsculas
        return value.toUpperCase();
      
      default:
        return value;
    }
  }
}

