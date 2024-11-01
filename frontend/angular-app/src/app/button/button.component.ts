import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { info } from 'console';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatButtonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  providers: [MessageService]
})
export class ButtonComponent {
  info: any;

  constructor(private apiService: ApiService, private messageService: MessageService) {}

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

  sendMessage() {
    this.apiService.postMessage().subscribe(
      (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Sent' });
        console.log('Server response:', response); 
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Sending Failed' });
        console.error('Error sending message: ', error);
      }
    );
  }

}
