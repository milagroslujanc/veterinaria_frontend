import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MascotaService } from '../../Service/mascota.service';
import { Mascota } from '../../Model/mascota.model';
import { HeaderComponent } from '../../../Shared/Component/header/header.component';
import { FooterComponent } from '../../../Shared/Component/footer/footer.component';

@Component({
  selector: 'app-detalle-mascota',
  templateUrl: './detalle-mascota.component.html',
  styleUrls: ['./detalle-mascota.component.scss'],
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent]
})
export class DetalleMascotaComponent implements OnInit {
  mascota: Mascota | undefined;

  constructor(
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mascota = this.mascotaService.getById(id);
      if (!this.mascota) {
        alert('Mascota no encontrada');
        this.router.navigate(['/mascota/lista']);
      }
    }
  }
}

