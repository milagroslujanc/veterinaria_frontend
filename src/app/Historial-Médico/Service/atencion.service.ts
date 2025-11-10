import { Injectable } from '@angular/core';
import { Atencion } from '../Model/atencion.model';
import { LocalStorageService } from '../../DataInicialization/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {
  private readonly STORAGE_KEY = 'atenciones';

  constructor(private localStorageService: LocalStorageService) {}

  getAll(): Atencion[] {
    return this.localStorageService.getData(this.STORAGE_KEY) || [];
  }

  getById(id: string): Atencion | undefined {
    const atenciones = this.getAll();
    return atenciones.find(a => a.idAtencion === id);
  }

  getByMascotaId(idMascota: string): Atencion[] {
    const atenciones = this.getAll();
    return atenciones.filter(a => a.idMascota === idMascota);
  }

  getByCitaId(idCita: string): Atencion | undefined {
    const atenciones = this.getAll();
    return atenciones.find(a => a.idCita === idCita);
  }

  create(atencion: Atencion): void {
    const atenciones = this.getAll();
    atenciones.push(atencion);
    this.localStorageService.saveData(this.STORAGE_KEY, atenciones);
  }

  update(id: string, atencion: Atencion): void {
    const atenciones = this.getAll();
    const index = atenciones.findIndex(a => a.idAtencion === id);
    if (index !== -1) {
      atenciones[index] = atencion;
      this.localStorageService.saveData(this.STORAGE_KEY, atenciones);
    }
  }

  delete(id: string): void {
    const atenciones = this.getAll();
    const filtered = atenciones.filter(a => a.idAtencion !== id);
    this.localStorageService.saveData(this.STORAGE_KEY, filtered);
  }
}

