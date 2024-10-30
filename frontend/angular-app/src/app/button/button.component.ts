import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { info } from 'console';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatButtonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  info: any;

  constructor(private apiService: ApiService) {}

  getInfo() {
    this.apiService.getInfo().subscribe((data: any) => {
      this.info = data.message;
      console.log(this.info);
    }, 
    (error) => {
      console.error('Error fetching info: ', error);
    }
  );
  }

}
