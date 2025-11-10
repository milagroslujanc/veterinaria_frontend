import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | null | undefined, format: string = 'dd/MM/yyyy'): string {
    if (!value) {
      return '';
    }

    try {
      const date = new Date(value);
      
      if (isNaN(date.getTime())) {
        // Si no es una fecha válida, intentar parsear formato YYYY-MM-DD
        const parts = value.split('-');
        if (parts.length === 3) {
          const year = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const day = parseInt(parts[2], 10);
          const parsedDate = new Date(year, month, day);
          
          if (!isNaN(parsedDate.getTime())) {
            return this.formatDate(parsedDate, format);
          }
        }
        return value;
      }

      return this.formatDate(date, format);
    } catch {
      return value;
    }
  }

  private formatDate(date: Date, format: string): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    switch (format) {
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'dd-MM-yyyy':
        return `${day}-${month}-${year}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'dd/MM/yy':
        return `${day}/${month}/${year.toString().slice(-2)}`;
      case 'long':
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return `${day} de ${months[date.getMonth()]} de ${year}`;
      default:
        return `${day}/${month}/${year}`;
    }
  }
}

