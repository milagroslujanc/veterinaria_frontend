import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  initializeData(): void {
    const initialData: Record<string, any> = {
      mascotas: [],
      citas: [],
      atenciones: []
    };

    Object.keys(initialData).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(initialData[key]));
      }
    });
  }

  initializeLogin(): void {
    if (!localStorage.getItem('isLoggedIn')) {
      localStorage.setItem('isLoggedIn', 'false');
    }
  }

  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

