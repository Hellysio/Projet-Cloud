import { NgModule } from "@angular/core";
import { AppComponent} from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { BrowserModule } from '@angular/platform-browser'
import { ApiService } from './service/api.service';
import { FeaturesComponent } from './features/features.component';

@NgModule({
    imports: [BrowserModule],
    providers: [ApiService],
    bootstrap: []
})

export class AppModule {}