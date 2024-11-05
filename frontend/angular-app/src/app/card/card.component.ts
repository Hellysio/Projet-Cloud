import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ApiService } from '../service/api.service';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

import { error, info } from 'console';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonModule, FileUploadModule, FieldsetModule, ProgressSpinnerModule, ToastModule, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [MessageService]
})

export class CardComponent {
  info: any;
  upLoadedFiles: any[] = [];
  formData: FormData = new FormData();
  serverResponse = "Server Response will be shown here";
  showSpinner = false;

  constructor(private apiService: ApiService, private messageService: MessageService, private http: HttpClient) {}

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

  AfterUpload(event: any) {
    console.log(event);
    console.log(event.originalEvent.body[0].generated_text);
    
    this.showSpinner = true;
    
    const randomTime = Math.floor(Math.random() * 2000); 
    setTimeout(() => {
        this.showSpinner = false; 
        this.serverResponse = event.originalEvent.body[0].generated_text; 
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded'
        });
    }, randomTime);
  }
}