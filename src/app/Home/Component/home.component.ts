import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../Shared/Component/header/header.component';
import { FooterComponent } from '../../Shared/Component/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent]
})
export class HomeComponent {
}