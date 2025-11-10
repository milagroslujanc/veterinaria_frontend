import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/form-field';
import { MascotaService } from '../../Service/mascota.service';
import { Mascota } from '../../Model/mascota.model';
import { HeaderComponent } from '../../../Shared/Component/header/header.component';
import { FooterComponent } from '../../../Shared/Component/footer/footer.component';
import { CustomValidators } from '../../../Shared/Validators/custom-validators';

@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
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
export class ModificarMascotaComponent implements OnInit {
  petForm: FormGroup;
  idMascota: string = '';
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.petForm = this.fb.group({
      idMascota: [{ value: '', disabled: true }],
      nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        CustomValidators.soloTexto()
      ]],
      especie: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      raza: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', [
        Validators.required,
        CustomValidators.fechaNoFutura(),
        CustomValidators.fechaMinima(0)
      ]],
      peso: ['', [
        Validators.required,
        Validators.min(0.1),
        Validators.max(200),
        CustomValidators.pesoMaximo(200)
      ]],
      color: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      dueno: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        CustomValidators.soloTexto()
      ]],
      celularContacto: ['', [
        Validators.required,
        CustomValidators.telefonoPeruano()
      ]],
      correoContacto: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      fechaRegistro: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.idMascota = this.route.snapshot.paramMap.get('id') || '';
    this.loadMascota();
  }

  loadMascota(): void {
    const mascota = this.mascotaService.getById(this.idMascota);
    if (mascota) {
      this.petForm.patchValue(mascota);
    } else {
      alert('Mascota no encontrada');
      this.router.navigate(['/mascota/lista']);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.petForm.controls;
  }

  getErrorMessage(controlName: string): string {
    const control = this.petForm.get(controlName);
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
    if (control.errors['email']) {
      return 'Correo electrónico inválido';
    }
    if (control.errors['telefonoInvalido']) {
      return 'El teléfono debe tener 9 dígitos';
    }
    if (control.errors['soloTexto']) {
      return 'Solo se permiten letras y espacios';
    }
    if (control.errors['fechaFutura']) {
      return 'La fecha no puede ser futura';
    }
    if (control.errors['pesoMaximo']) {
      return `El peso no puede exceder ${control.errors['pesoMaximo'].pesoMax} kg`;
    }

    return 'Campo inválido';
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      nombre: 'Nombre',
      especie: 'Especie',
      raza: 'Raza',
      sexo: 'Sexo',
      fechaNacimiento: 'Fecha de Nacimiento',
      peso: 'Peso',
      color: 'Color',
      dueno: 'Dueño',
      celularContacto: 'Celular de Contacto',
      correoContacto: 'Correo de Contacto'
    };
    return labels[controlName] || controlName;
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.petForm.get(controlName);
    return !!(control && (control.invalid && (control.touched || this.submitted)));
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.petForm.invalid) {
      Object.keys(this.petForm.controls).forEach(key => {
        this.petForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = {
      ...this.petForm.value,
      idMascota: this.petForm.get('idMascota')?.value,
      fechaRegistro: this.petForm.get('fechaRegistro')?.value
    };
    const mascota: Mascota = formValue;
    this.mascotaService.update(this.idMascota, mascota);
    alert('Mascota actualizada exitosamente');
    this.router.navigate(['/mascota/lista']);
  }

  cancelar(): void {
    this.router.navigate(['/mascota/lista']);
  }
}

