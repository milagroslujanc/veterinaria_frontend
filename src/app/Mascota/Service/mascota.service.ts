import { Injectable } from '@angular/core';
import { Mascota } from '../Model/mascota.model';
import { LocalStorageService } from '../../DataInicialization/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private readonly STORAGE_KEY = 'mascotas';

  constructor(private localStorageService: LocalStorageService) {}

  getAll(): Mascota[] {
    return this.localStorageService.getData(this.STORAGE_KEY) || [];
  }

  getById(id: string): Mascota | undefined {
    const mascotas = this.getAll();
    return mascotas.find(m => m.idMascota === id);
  }

  create(mascota: Mascota): void {
    const mascotas = this.getAll();
    mascotas.push(mascota);
    this.localStorageService.saveData(this.STORAGE_KEY, mascotas);
  }

  update(id: string, mascota: Mascota): void {
    const mascotas = this.getAll();
    const index = mascotas.findIndex(m => m.idMascota === id);
    if (index !== -1) {
      mascotas[index] = mascota;
      this.localStorageService.saveData(this.STORAGE_KEY, mascotas);
    }
  }

  delete(id: string): void {
    const mascotas = this.getAll();
    const filtered = mascotas.filter(m => m.idMascota !== id);
    this.localStorageService.saveData(this.STORAGE_KEY, filtered);
  }
}

