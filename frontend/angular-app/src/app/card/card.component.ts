import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ApiService } from '../service/api.service';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

import { error, info } from 'console';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonModule, FileUploadModule, ToastModule, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [MessageService]
})

export class CardComponent {
  info: any;
  upLoadedFiles: any[] = [];
  formData: FormData = new FormData();


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
     for (let file of event.files) {
       this.formData.append('file', file);
       const fileSizeInMB = file.size / (1024 * 1024); 
       console.log(`File Name: ${file.name}`);
       console.log(`File Size: ${fileSizeInMB.toFixed(2)} MB`);

       this.apiService.uploadImage(file).subscribe((data: any) => {
         this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
         console.log(data);
       },
       (error: any)=> {
         this.messageService.add({severity: 'error', summary: 'Error', detail: 'File Upload Failed'});
         console.error('Error uploading file: ', error);
       }
       );
     }
   }
}