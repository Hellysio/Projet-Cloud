import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FeaturesComponent } from './components/features/features.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'features', component: FeaturesComponent },
    { path: 'landing', component: LandingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}