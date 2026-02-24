import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameFormComponent } from '../game-form/game-form';
import { GameService } from '../services/game';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { searchGameDTO } from '../models/searchGameDto';
import { AddSessionGameComponent } from '../add-session-game/add-session-game';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.html',
  imports:[
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./home.css']
})
export class HomeComponent {
  minComplexity: number = 1;
  maxComplexity: number = 5;
  complexityOptions: number[] = [1, 2, 3, 4, 5];
  minPlayingTime: number = 15;
  maxPlayingTime: number = 300;
  selectedGame: any;

  constructor(
    private dialog: MatDialog,
    private gameService: GameService
  ) {}

  openGameForm(): void {
    this.dialog.open(GameFormComponent, {
      width: '400px'
    });
  }

  selectRandomGame(): void {
    const searchGameDTO: searchGameDTO = {
      complexityMin: this.minComplexity,
      complexityMax: this.maxComplexity,
      playingTimeMin: this.minPlayingTime,
      playingTimeMax: this.maxPlayingTime
    };
    this.gameService.getRandomGame(searchGameDTO)
      .subscribe(game => {
        this.selectedGame = game;
      });
  }

  validateGameSelection(): void {
    console.log(this.selectedGame);
    if (this.selectedGame) {
      this.gameService.validateGame(this.selectedGame.idGame)
        .subscribe(() => {
          alert(`On a joué à ${this.selectedGame.name} aujourd'hui !`);
        });
    }
  }
  
  addSessionForSpecificGame() {
    this.dialog.open(AddSessionGameComponent, {
      width: '400px'
    });
  }
}
