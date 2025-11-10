import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../../Service/mascota.service';
import { Mascota } from '../../Model/mascota.model';
import { HeaderComponent } from '../../../Shared/Component/header/header.component';
import { FooterComponent } from '../../../Shared/Component/footer/footer.component';

@Component({
  selector: 'app-eliminar-mascota',
  templateUrl: './eliminar-mascota.component.html',
  styleUrls: ['./eliminar-mascota.component.scss'],
  imports: [CommonModule, HeaderComponent, FooterComponent]
})
export class EliminarMascotaComponent implements OnInit {
  mascota: Mascota | undefined;
  idMascota: string = '';

  constructor(
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idMascota = this.route.snapshot.paramMap.get('id') || '';
    this.mascota = this.mascotaService.getById(this.idMascota);
    if (!this.mascota) {
      alert('Mascota no encontrada');
      this.router.navigate(['/mascota/lista']);
    }
  }

  confirmDelete(): void {
    if (confirm(`¿Está seguro de eliminar la mascota ${this.mascota?.nombre}?`)) {
      this.mascotaService.delete(this.idMascota);
      alert('Mascota eliminada exitosamente');
      this.router.navigate(['/mascota/lista']);
    }
  }

  cancel(): void {
    this.router.navigate(['/mascota/lista']);
  }
}

