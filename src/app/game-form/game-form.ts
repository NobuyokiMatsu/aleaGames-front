import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { GameService } from '../services/game';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TypeService } from '../services/type';
import { Type } from '../models/typeModel';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-game-form',
  templateUrl: './game-form.html',
  imports:[MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    ReactiveFormsModule,
    FormsModule,
    MatCheckbox,
    MatInputModule,
    MatDialogClose,
    MatOption,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE] },
  ],
  styleUrls: ['./game-form.css']
})
export class GameFormComponent implements OnInit {
  gameForm!: FormGroup;
  complexityValues: number[] = [1, 2, 3, 4, 5];
  typeList! : Type[];
  typeToSave! : Type[];
  lastTimePlayed!: Date;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private typeService: TypeService,
    private dialogRef: MatDialogRef<GameFormComponent>,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.gameForm = this.fb.group({
      name: [''],
      complexity: [1],
      playingTime: [30],
      competitive: [false],
      typeList: [null],
      lastTimePlayed: null
    });

  }

  ngOnInit(): void {
    this.typeService.getAllTypes().subscribe(typeList => {
      this.typeList = typeList;
      console.log(typeList);
    });
    this.dateAdapter.setLocale('fr-FR');
  }

  onSubmit(): void {
    console.log(this.gameForm.value);
    this.gameService.createGame(this.gameForm.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
