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
import { CitaService } from '../../Service/cita.service';
import { Cita } from '../../Model/cita.model';
import { MascotaService } from '../../../Mascota/Service/mascota.service';
import { Mascota } from '../../../Mascota/Model/mascota.model';
import { HeaderComponent } from '../../../Shared/Component/header/header.component';
import { FooterComponent } from '../../../Shared/Component/footer/footer.component';
import { CustomValidators } from '../../../Shared/Validators/custom-validators';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss'],
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
export class AgendarCitaComponent implements OnInit {
  appointmentForm: FormGroup;
  mascotas: Mascota[] = [];
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private mascotaService: MascotaService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      idCita: [{ value: '', disabled: true }],
      idMascota: ['', Validators.required],
      fechaCita: ['', [
        Validators.required,
        CustomValidators.fechaNoPasado()
      ]],
      horaCita: ['', [
        Validators.required,
        CustomValidators.horarioAtencion('08:00', '20:00')
      ]],
      motivo: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]],
      veterinarioAsignado: ['', Validators.required],
      estadoCita: ['Programada', Validators.required],
      observaciones: ['', Validators.maxLength(1000)],
      fechaRegistro: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMascotas();
    this.generarIdCita();
  }

  loadMascotas(): void {
    this.mascotas = this.mascotaService.getAll();
  }

  generarIdCita(): void {
    const nextId = this.citaService.getNextId();
    this.appointmentForm.get('idCita')?.enable();
    this.appointmentForm.patchValue({
      idCita: nextId
    });
    this.appointmentForm.get('idCita')?.disable();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.appointmentForm.controls;
  }

  getErrorMessage(controlName: string): string {
    const control = this.appointmentForm.get(controlName);
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
    if (control.errors['fechaPasado']) {
      return 'La fecha de la cita no puede ser en el pasado';
    }
    if (control.errors['horarioInvalido']) {
      return `El horario de atención es de ${control.errors['horarioInvalido'].horaInicio} a ${control.errors['horarioInvalido'].horaFin}`;
    }

    return 'Campo inválido';
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      idMascota: 'Mascota',
      fechaCita: 'Fecha de Cita',
      horaCita: 'Hora de Cita',
      motivo: 'Motivo',
      veterinarioAsignado: 'Veterinario Asignado',
      estadoCita: 'Estado de Cita',
      observaciones: 'Observaciones'
    };
    return labels[controlName] || controlName;
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.appointmentForm.get(controlName);
    return !!(control && (control.invalid && (control.touched || this.submitted)));
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.appointmentForm.invalid) {
      Object.keys(this.appointmentForm.controls).forEach(key => {
        this.appointmentForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = {
      ...this.appointmentForm.value,
      idCita: this.appointmentForm.get('idCita')?.value
    };
    const cita: Cita = formValue;
    this.citaService.create(cita);
    alert('Cita agendada exitosamente');
    this.router.navigate(['/citas/lista']);
  }

  cancelar(): void {
    this.router.navigate(['/citas/lista']);
  }
}

