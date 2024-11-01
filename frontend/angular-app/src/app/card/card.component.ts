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

   UploadImage(event:any) {
      this.showSpinner = true;
      for (let file of event.files) {
        this.formData.append('file', file);
       
        this.apiService.uploadImage(file).subscribe(
        (response: any) => {
          this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
          this.serverResponse = response[0].generated_text;
          this.showSpinner = false;
          console.log('Server response:', response[0].generated_text);
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Sending Failed' });
          this.showSpinner = false;
          this.serverResponse = error[0].generated_text;
          console.error('Error sending file: ', error);
        }
        );
     }
   }
}