import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AtencionService } from '../../Service/atencion.service';
import { Atencion } from '../../Model/atencion.model';
import { MascotaService } from '../../../Mascota/Service/mascota.service';
import { HeaderComponent } from '../../../Shared/Component/header/header.component';
import { FooterComponent } from '../../../Shared/Component/footer/footer.component';

@Component({
  selector: 'app-listado-atenciones',
  templateUrl: './listado-atenciones.component.html',
  styleUrls: ['./listado-atenciones.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class ListadoAtencionesComponent implements OnInit {
  atenciones: Atencion[] = [];
  atencionesFiltradas: Atencion[] = [];
  searchForm: FormGroup;
  mostrarResultados: boolean = false;

  constructor(
    private atencionService: AtencionService,
    private mascotaService: MascotaService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      idMascota: ['']
    });
  }

  ngOnInit(): void {
    // No cargar atenciones al inicio, solo cuando se busque
  }

  buscarAtenciones(): void {
    const idMascota = this.searchForm.get('idMascota')?.value;
    
    if (idMascota && idMascota.trim() !== '') {
      this.atencionesFiltradas = this.atencionService.getByMascotaId(idMascota);
      this.mostrarResultados = true;
      
      if (this.atencionesFiltradas.length === 0) {
        alert('No se encontraron atenciones para esta mascota');
      }
    } else {
      alert('Por favor, ingrese un ID de mascota');
    }
  }

  limpiarBusqueda(): void {
    this.searchForm.reset();
    this.atencionesFiltradas = [];
    this.mostrarResultados = false;
  }

  getMascotaNombre(idMascota: string): string {
    const mascota = this.mascotaService.getById(idMascota);
    return mascota ? mascota.nombre : 'N/A';
  }
}

