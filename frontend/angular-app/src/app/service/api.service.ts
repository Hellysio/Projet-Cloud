import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'send-info/');
  }

  upload_image(): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'upload_image/', {});
  }
}
