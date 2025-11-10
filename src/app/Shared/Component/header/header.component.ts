import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent {
  menuOptions = [
    { label: 'Home', route: '/home' },
    { label: 'Mascota', route: '/mascota/lista' },
    { label: 'Citas', route: '/citas/lista' },
    { label: 'Atencion', route: '/historial-medico/atender' },
    { label: 'Historial', route: '/historial-medico/lista' }
  ];
}

