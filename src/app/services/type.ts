import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../models/typeModel';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private apiUrl = 'http://localhost:8080/api/type';
  constructor(private http: HttpClient) {}

  getAllTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  
}
