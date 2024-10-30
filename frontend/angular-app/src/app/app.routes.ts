import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FeaturesComponent } from './features/features.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    { path: 'features', component: FeaturesComponent },
    { path: 'landing', component: LandingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}