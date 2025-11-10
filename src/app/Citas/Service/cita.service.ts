import { Injectable } from '@angular/core';
import { Cita } from '../Model/cita.model';
import { LocalStorageService } from '../../DataInicialization/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private readonly STORAGE_KEY = 'citas';

  constructor(private localStorageService: LocalStorageService) {}

  getAll(): Cita[] {
    return this.localStorageService.getData(this.STORAGE_KEY) || [];
  }

  getById(id: string): Cita | undefined {
    const citas = this.getAll();
    return citas.find(c => c.idCita === id);
  }

  getByMascotaId(idMascota: string): Cita[] {
    const citas = this.getAll();
    return citas.filter(c => c.idMascota === idMascota);
  }

  getByFecha(fecha: string): Cita[] {
    const citas = this.getAll();
    return citas.filter(c => c.fechaCita === fecha && c.estadoCita !== 'Completada');
  }

  getByFechaAndMascota(fecha: string, idMascota: string): Cita[] {
    const citas = this.getAll();
    return citas.filter(c => c.fechaCita === fecha && c.idMascota === idMascota && c.estadoCita !== 'Completada');
  }

  create(cita: Cita): void {
    const citas = this.getAll();
    citas.push(cita);
    this.localStorageService.saveData(this.STORAGE_KEY, citas);
  }

  update(id: string, cita: Cita): void {
    const citas = this.getAll();
    const index = citas.findIndex(c => c.idCita === id);
    if (index !== -1) {
      citas[index] = cita;
      this.localStorageService.saveData(this.STORAGE_KEY, citas);
    }
  }

  delete(id: string): void {
    const citas = this.getAll();
    const filtered = citas.filter(c => c.idCita !== id);
    this.localStorageService.saveData(this.STORAGE_KEY, filtered);
  }

  getNextId(): string {
    const citas = this.getAll();
    if (citas.length === 0) {
      return '1';
    }
    // Obtener el máximo ID numérico y sumar 1
    const maxId = citas.reduce((max, cita) => {
      const idNum = parseInt(cita.idCita, 10);
      return !isNaN(idNum) && idNum > max ? idNum : max;
    }, 0);
    return (maxId + 1).toString();
  }
}

