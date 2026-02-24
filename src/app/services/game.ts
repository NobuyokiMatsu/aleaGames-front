import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { searchGameDTO } from '../models/searchGameDto';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/game'; // URL de ton backend

  constructor(private http: HttpClient) {}

  getRandomGame(searchGameDTO: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/randomGame`, searchGameDTO);
  }

  createGame(game: any): Observable<any> {
    return this.http.post(this.apiUrl, game);
  }

  validateGame(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/selected/${id}`, null);
  }

  getAllGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
