import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'features', component: FeaturesComponent },
    { path: '', component: LandingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}