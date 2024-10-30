import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { FeatureCardComponent } from "../feature-card/feature-card.component";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, CardComponent, FeatureCardComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

}
