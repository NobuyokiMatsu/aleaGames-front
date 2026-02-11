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
  styleUrls: ['./home.scss']
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
    const searchGameDTO = {
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
    if (this.selectedGame) {
      this.gameService.validateGame(this.selectedGame.id)
        .subscribe(() => {
          alert(`Jeu ${this.selectedGame.name} validé !`);
        });
    }
  }
}
