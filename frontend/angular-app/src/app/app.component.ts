import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { ApiService } from './service/api.service';
import { FeaturesComponent } from './features/features.component';
import { features } from 'process';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent, CardComponent, FeaturesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  items: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getInfo().subscribe((data: any[]) => {
      this.items = data;
    });
  }
}
