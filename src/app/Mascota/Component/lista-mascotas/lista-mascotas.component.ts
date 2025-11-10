import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MascotaService } from '../../Service/mascota.service';
import { Mascota } from '../../Model/mascota.model';
import { HeaderComponent } from '../../../Shared/Component/header/header.component';
import { FooterComponent } from '../../../Shared/Component/footer/footer.component';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.scss'],
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent]
})
export class ListaMascotasComponent implements OnInit {
  mascotas: Mascota[] = [];

  constructor(private mascotaService: MascotaService) {}

  ngOnInit(): void {
    this.loadMascotas();
  }

  loadMascotas(): void {
    this.mascotas = this.mascotaService.getAll();
  }

  deleteMascota(id: string): void {
    if (confirm('¿Está seguro de eliminar esta mascota?')) {
      this.mascotaService.delete(id);
      this.loadMascotas();
    }
  }
}

