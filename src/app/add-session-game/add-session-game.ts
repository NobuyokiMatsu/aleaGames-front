import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { GameService } from '../services/game';
import { gameDto } from '../models/gameDto';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-session-game',
  templateUrl: './add-session-game.html',
  styleUrl: './add-session-game.css',
  imports:[MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogClose,
    MatOption,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocomplete,
    MatAutocompleteModule
  ],
})
export class AddSessionGameComponent {
  searchForm!: FormGroup;
  games: gameDto[] = [];
  filteredGames: gameDto[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSessionGameComponent>,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [''],
      selectedGame: [''], // Stocke l'ID du jeu sélectionné
    });

    // Charger la liste des jeux depuis l'API
    this.gameService.getAllGames().subscribe((games) => {
      this.games = games;
      this.filteredGames = games;
    });
  }

  // Filtrer les jeux en fonction de la recherche
  filterGames(): void {
    const searchTerm = this.searchForm.get('search')?.value.toLowerCase();
    this.filteredGames = this.games.filter((game) =>
      game.name.toLowerCase().includes(searchTerm),
    );
  }

  // Mettre à jour le champ caché avec l'ID du jeu sélectionné
  onGameSelected(gameId: number): void {
    this.searchForm.patchValue({
      selectedGame: gameId,
    });
  }

  // Appel API lors de la validation
  onSubmit(): void {
    const selectedGameId = this.searchForm.get('selectedGame')?.value;
    if (selectedGameId) {
      this.gameService.validateGame(selectedGameId).subscribe(
        (response) => {
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Erreur lors de la validation:', error);
        },
      );
    }
  }

}
