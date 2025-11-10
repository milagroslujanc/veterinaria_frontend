import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/form-field';
import { AtencionService } from '../../Service/atencion.service';
import { Atencion } from '../../Model/atencion.model';
import { CitaService } from '../../../Citas/Service/cita.service';
import { Cita } from '../../../Citas/Model/cita.model';
import { MascotaService } from '../../../Mascota/Service/mascota.service';
import { Mascota } from '../../../Mascota/Model/mascota.model';
import { HeaderComponent } from '../../../Shared/Component/header/header.component';
import { FooterComponent } from '../../../Shared/Component/footer/footer.component';
import { CustomValidators } from '../../../Shared/Validators/custom-validators';

@Component({
  selector: 'app-atender-cita',
  templateUrl: './atender-cita.component.html',
  styleUrls: ['./atender-cita.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatError,
    HeaderComponent,
    FooterComponent
  ]
})
export class AtenderCitaComponent implements OnInit {
  attentionForm: FormGroup;
  citas: Cita[] = [];
  citasFiltradas: Cita[] = [];
  filterForm: FormGroup;
  citaSeleccionada: Cita | null = null;
  mostrarFormulario: boolean = false;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private atencionService: AtencionService,
    private citaService: CitaService,
    private mascotaService: MascotaService,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      fecha: [new Date().toISOString().split('T')[0]],
      idMascota: ['']
    });

    const idsExistentes = this.atencionService.getAll().map(a => a.idAtencion);
    
    this.attentionForm = this.fb.group({
      idAtencion: ['', [
        Validators.required,
        Validators.minLength(1),
        CustomValidators.idUnico(idsExistentes)
      ]],
      idCita: [{ value: '', disabled: true }],
      fechaAtencionReal: [new Date().toISOString().split('T')[0], [
        Validators.required,
        CustomValidators.fechaNoFutura()
      ]],
      veterinario: ['', Validators.required],
      diagnostico: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000)
      ]],
      procedimiento: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000)
      ]],
      receta: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500)
      ]],
      estadoFinal: ['', Validators.required],
      proximoControl: ['', CustomValidators.fechaNoPasado()],
      tratamiento: ['', Validators.maxLength(1000)],
      vacunasAplicadas: ['', Validators.maxLength(500)],
      pesoActual: ['', [
        Validators.min(0.1),
        Validators.max(200),
        CustomValidators.pesoMaximo(200)
      ]],
      observaciones: ['', Validators.maxLength(1000)]
    });
  }

  ngOnInit(): void {
    this.cargarCitasDelDia();
  }

  cargarCitasDelDia(): void {
    const fecha = this.filterForm.get('fecha')?.value || new Date().toISOString().split('T')[0];
    const idMascota = this.filterForm.get('idMascota')?.value;
    
    if (idMascota && idMascota.trim() !== '') {
      this.citasFiltradas = this.citaService.getByFechaAndMascota(fecha, idMascota);
    } else {
      this.citasFiltradas = this.citaService.getByFecha(fecha);
    }
  }

  filtrarCitas(): void {
    this.cargarCitasDelDia();
  }

  seleccionarCita(cita: Cita): void {
    this.citaSeleccionada = cita;
    this.mostrarFormulario = true;
    this.submitted = false;
    this.attentionForm.patchValue({
      idCita: cita.idCita,
      fechaAtencionReal: new Date().toISOString().split('T')[0],
      veterinario: cita.veterinarioAsignado || ''
    });
    this.attentionForm.get('idCita')?.disable();
  }

  cancelarAtencion(): void {
    this.citaSeleccionada = null;
    this.mostrarFormulario = false;
    this.submitted = false;
    this.attentionForm.reset();
    this.attentionForm.patchValue({
      fechaAtencionReal: new Date().toISOString().split('T')[0]
    });
  }

  getMascotaNombre(idMascota: string): string {
    const mascota = this.mascotaService.getById(idMascota);
    return mascota ? mascota.nombre : 'N/A';
  }

  getErrorMessage(controlName: string): string {
    const control = this.attentionForm.get(controlName);
    if (!control || !control.errors || (!control.touched && !this.submitted)) {
      return '';
    }

    if (control.errors['required']) {
      return `${this.getFieldLabel(controlName)} es requerido`;
    }
    if (control.errors['minlength']) {
      return `${this.getFieldLabel(controlName)} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control.errors['maxlength']) {
      return `${this.getFieldLabel(controlName)} no puede exceder ${control.errors['maxlength'].requiredLength} caracteres`;
    }
    if (control.errors['min']) {
      return `${this.getFieldLabel(controlName)} debe ser mayor a ${control.errors['min'].min}`;
    }
    if (control.errors['max']) {
      return `${this.getFieldLabel(controlName)} no puede exceder ${control.errors['max'].max}`;
    }
    if (control.errors['idDuplicado']) {
      return 'Este ID de atención ya existe';
    }
    if (control.errors['fechaFutura']) {
      return 'La fecha no puede ser futura';
    }
    if (control.errors['fechaPasado']) {
      return 'La fecha no puede ser en el pasado';
    }
    if (control.errors['pesoMaximo']) {
      return `El peso no puede exceder ${control.errors['pesoMaximo'].pesoMax} kg`;
    }

    return 'Campo inválido';
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      idAtencion: 'ID Atención',
      fechaAtencionReal: 'Fecha de Atención Real',
      veterinario: 'Veterinario',
      diagnostico: 'Diagnóstico',
      procedimiento: 'Procedimiento',
      receta: 'Receta',
      estadoFinal: 'Estado Final',
      proximoControl: 'Próximo Control',
      tratamiento: 'Tratamiento',
      vacunasAplicadas: 'Vacunas Aplicadas',
      pesoActual: 'Peso Actual',
      observaciones: 'Observaciones'
    };
    return labels[controlName] || controlName;
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.attentionForm.get(controlName);
    return !!(control && (control.invalid && (control.touched || this.submitted)));
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.attentionForm.invalid) {
      Object.keys(this.attentionForm.controls).forEach(key => {
        this.attentionForm.get(key)?.markAsTouched();
      });
      return;
    }

    if (!this.citaSeleccionada) {
      alert('Por favor, seleccione una cita primero.');
      return;
    }

    const formValue = {
      ...this.attentionForm.value,
      idCita: this.attentionForm.get('idCita')?.value
    };
    
    const atencion: Atencion = {
      ...formValue,
      idMascota: this.citaSeleccionada.idMascota
    };
    
    this.atencionService.create(atencion);
    
    // Actualizar estado de la cita
    this.citaSeleccionada.estadoCita = 'Completada';
    this.citaService.update(this.citaSeleccionada.idCita, this.citaSeleccionada);
    
    alert('Atención registrada exitosamente');
    this.cargarCitasDelDia();
    this.cancelarAtencion();
  }
}

