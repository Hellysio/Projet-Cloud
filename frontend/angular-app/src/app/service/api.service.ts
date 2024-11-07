import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { error } from 'node:console';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/';
  //private apiUrl = environment.API_BASE_URL + '/api/';

  constructor(private http: HttpClient) {}

  getInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}send_info/`);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData(); 
    formData.append('fileUpload', file); 

    return this.http.post<any>(`${this.apiUrl}upload_image/`, formData).pipe(
      catchError((error) => {
        console.error('Error uploading file: ', error);
        return error;
      })
    );
  }

  postMessage(): Observable<any> {
    console.log ('api: ' + `${this.apiUrl}post_message/`)
    const uploadData = new FormData();
    uploadData.append('message', 'Hello from Angular!');

    return this.http.post(`${this.apiUrl}post_message/`, uploadData).pipe(
      catchError((error) => {
        console.error('Error posting message: ', error);
        return error;
      })
    );
  }
}
