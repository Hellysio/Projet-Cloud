import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { ButtonComponent } from '../button/button.component';
import { info } from 'console';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

}
