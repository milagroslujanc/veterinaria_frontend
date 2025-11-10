import { Routes } from '@angular/router';
import { LoginComponent } from './Login/Component/login.component';
import { HomeComponent } from './Home/Component/home.component';

// Mascota
import { ListaMascotasComponent } from './Mascota/Component/lista-mascotas/lista-mascotas.component';
import { RegistroMascotaComponent } from './Mascota/Component/registro-mascota/registro-mascota.component';
import { ModificarMascotaComponent } from './Mascota/Component/modificar-mascota/modificar-mascota.component';
import { DetalleMascotaComponent } from './Mascota/Component/detalle-mascota/detalle-mascota.component';
import { EliminarMascotaComponent } from './Mascota/Component/eliminar-mascota/eliminar-mascota.component';

// Citas
import { ListadoCitasComponent } from './Citas/Component/listado-citas/listado-citas.component';
import { AgendarCitaComponent } from './Citas/Component/agendar-cita/agendar-cita.component';

// Historial Médico
import { ListadoAtencionesComponent } from './Historial-Médico/Component/listado-atenciones/listado-atenciones.component';
import { DetalleAtencionComponent } from './Historial-Médico/Component/detalle-atencion/detalle-atencion.component';
import { AtenderCitaComponent } from './Historial-Médico/Component/atender-cita/atender-cita.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  
  // Rutas de Mascota
  { path: 'mascota/lista', component: ListaMascotasComponent },
  { path: 'mascota/registro', component: RegistroMascotaComponent },
  { path: 'mascota/modificar/:id', component: ModificarMascotaComponent },
  { path: 'mascota/detalle/:id', component: DetalleMascotaComponent },
  { path: 'mascota/eliminar/:id', component: EliminarMascotaComponent },
  
  // Rutas de Citas
  { path: 'citas/lista', component: ListadoCitasComponent },
  { path: 'citas/agendar', component: AgendarCitaComponent },
  
  // Rutas de Historial Médico
  { path: 'historial-medico/lista', component: ListadoAtencionesComponent },
  { path: 'historial-medico/detalle/:id', component: DetalleAtencionComponent },
  { path: 'historial-medico/atender', component: AtenderCitaComponent },
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
