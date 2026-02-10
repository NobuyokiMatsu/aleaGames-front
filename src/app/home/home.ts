import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameFormComponent } from '../game-form/game-form';
import { GameService } from '../services/game';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.html',
  imports:[MatDialogModule],
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
