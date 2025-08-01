import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassificationResponse } from '../models/classification.interface';

@Injectable({
  providedIn: 'root'
})
export class CnnService {

  private apiUrl = 'http://127.0.0.1:8000/predict'; 

  constructor(private http: HttpClient) { }


  classifyImage(imageFile: File): Observable<ClassificationResponse> {
    const formData = new FormData();
    formData.append('file', imageFile);
    return this.http.post<ClassificationResponse>(this.apiUrl, formData);
  }

}
