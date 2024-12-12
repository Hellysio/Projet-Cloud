import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from "../feature-card/feature-card.component";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, FeatureCardComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

}
