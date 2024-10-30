import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ApiService } from '../service/api.service';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

import { error, info } from 'console';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonModule, FileUploadModule, ToastModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [MessageService]
})

export class CardComponent {
  info: any;
  upLoadedFiles: any[] = [];

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
  onUpload(event:any) {
    for (let file of event.files) {
      this.upLoadedFiles.push(file);
      const fileSizeInMB = file.size / (1024 * 1024);  // Convert bytes to MB
      console.log(`File Name: ${file.name}`);
      console.log(`File Size: ${fileSizeInMB.toFixed(2)} MB`);
      console.log(`File Type: ${file.type}`);
    }

    this.http.post('http://localhost:3000/api/upload_image/', this.upLoadedFiles[0]).subscribe((data: any) => {
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
      console.log(data);
    },
    (error: any)=> {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'File Upload Failed'});
      console.error('Error uploading file: ', error
    );
  }
  );
  }
}