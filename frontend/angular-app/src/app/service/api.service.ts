import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.API_BASE_URL + '/api/';

  constructor(private http: HttpClient) {}

  getInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}send_info/`);
  }

  uploadImage(file: File): Observable<any> {
    console.log('Uploading file: ', file);
    const formData = new FormData(); 
    formData.append('fileUpload', file); 

    return this.http.post<any>(`${this.apiUrl}upload_image/`, formData).pipe(
      catchError((error) => {
        console.error('Error uploading file: ', error);
        return error;
      })
    );
  }
}
