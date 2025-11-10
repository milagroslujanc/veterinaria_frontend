import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  // Validador para fecha no futura
  static fechaNoFutura(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const fecha = new Date(control.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (fecha > hoy) {
        return { fechaFutura: true };
      }
      return null;
    };
  }

  // Validador para fecha mínima (ej: fecha de nacimiento no puede ser muy reciente)
  static fechaMinima(aniosMinimos: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const fecha = new Date(control.value);
      const fechaMinima = new Date();
      fechaMinima.setFullYear(fechaMinima.getFullYear() - aniosMinimos);
      
      if (fecha > fechaMinima) {
        return { fechaMinima: { aniosMinimos } };
      }
      return null;
    };
  }

  // Validador para peso máximo razonable
  static pesoMaximo(pesoMax: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const peso = parseFloat(control.value);
      if (isNaN(peso) || peso > pesoMax) {
        return { pesoMaximo: { pesoMax } };
      }
      return null;
    };
  }

  // Validador para ID único (verificar que no exista)
  static idUnico(idsExistentes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      if (idsExistentes.includes(control.value)) {
        return { idDuplicado: true };
      }
      return null;
    };
  }

  // Validador para teléfono peruano (9 dígitos)
  static telefonoPeruano(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const telefono = control.value.toString().replace(/\D/g, '');
      if (telefono.length !== 9) {
        return { telefonoInvalido: true };
      }
      return null;
    };
  }

  // Validador para texto sin números
  static soloTexto(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!regex.test(control.value)) {
        return { soloTexto: true };
      }
      return null;
    };
  }

  // Validador para fecha de cita no puede ser en el pasado
  static fechaNoPasado(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const fecha = new Date(control.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (fecha < hoy) {
        return { fechaPasado: true };
      }
      return null;
    };
  }

  // Validador para hora válida en horario de atención (ej: 8:00 - 20:00)
  static horarioAtencion(horaInicio: string = '08:00', horaFin: string = '20:00'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const hora = control.value;
      if (hora < horaInicio || hora > horaFin) {
        return { horarioInvalido: { horaInicio, horaFin } };
      }
      return null;
    };
  }
}

