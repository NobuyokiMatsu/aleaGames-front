import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/game'; // URL de ton backend

  constructor(private http: HttpClient) {}

  getRandomGame(minComplexity: number, maxComplexity: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/random?minComplexity=${minComplexity}&maxComplexity=${maxComplexity}`);
  }

  createGame(game: any): Observable<any> {
    return this.http.post(this.apiUrl, game);
  }

  validateGame(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/validate`, {});
  }
}
