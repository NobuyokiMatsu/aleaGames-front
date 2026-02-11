import { Component, signal } from '@angular/core';
import { HomeComponent } from './home/home';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports:[HomeComponent],
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('alea-games-front');
}
