import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AtencionService } from '../../Service/atencion.service';
import { Atencion } from '../../Model/atencion.model';
import { MascotaService } from '../../../Mascota/Service/mascota.service';
import { Mascota } from '../../../Mascota/Model/mascota.model';
import { HeaderComponent } from '../../../Shared/Component/header/header.component';
import { FooterComponent } from '../../../Shared/Component/footer/footer.component';

@Component({
  selector: 'app-detalle-atencion',
  templateUrl: './detalle-atencion.component.html',
  styleUrls: ['./detalle-atencion.component.scss'],
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent]
})
export class DetalleAtencionComponent implements OnInit {
  atencion: Atencion | undefined;
  mascota: Mascota | undefined;

  constructor(
    private atencionService: AtencionService,
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.atencion = this.atencionService.getById(id);
      if (this.atencion) {
        this.mascota = this.mascotaService.getById(this.atencion.idMascota);
      } else {
        alert('Atención no encontrada');
        this.router.navigate(['/historial-medico/lista']);
      }
    }
  }
}

