import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from '../services/game';

@Component({
  standalone: true,
  selector: 'app-game-form',
  templateUrl: './game-form.html',
  imports:[MatDialogRefModule],
  styleUrls: ['./game-form.scss']
})
export class GameFormComponent implements OnInit {
  gameForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private dialogRef: MatDialogRef<GameFormComponent>
  ) {}

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      name: [''],
      complexity: [1],
      playingTime: [30]
      // Ajoute les autres champs
    });
  }

  onSubmit(): void {
    this.gameService.createGame(this.gameForm.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
