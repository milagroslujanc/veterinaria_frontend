import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './DataInicialization/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('SmartVet-FrontEnd');

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    // Inicializar datos en localStorage al cargar la aplicación
    this.localStorageService.initializeData();
    this.localStorageService.initializeLogin();
  }
}
