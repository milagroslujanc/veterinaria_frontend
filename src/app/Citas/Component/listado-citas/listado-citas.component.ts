import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CitaService } from '../../Service/cita.service';
import { Cita } from '../../Model/cita.model';
import { MascotaService } from '../../../Mascota/Service/mascota.service';
import { HeaderComponent } from '../../../Shared/Component/header/header.component';
import { FooterComponent } from '../../../Shared/Component/footer/footer.component';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.scss'],
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent]
})
export class ListadoCitasComponent implements OnInit {
  citas: Cita[] = [];

  constructor(
    private citaService: CitaService,
    private mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas(): void {
    this.citas = this.citaService.getAll();
  }

  getMascotaNombre(idMascota: string): string {
    const mascota = this.mascotaService.getById(idMascota);
    return mascota ? mascota.nombre : 'N/A';
  }

  deleteCita(id: string): void {
    if (confirm('¿Está seguro de eliminar esta cita?')) {
      this.citaService.delete(id);
      this.loadCitas();
    }
  }
}

