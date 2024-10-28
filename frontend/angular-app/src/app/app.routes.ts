import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    { path: 'features', component: FeaturesComponent },
    { path: '', component: LandingComponent },
];
