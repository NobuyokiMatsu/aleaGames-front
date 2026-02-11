import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFormComponent } from './game-form';

describe('GameForm', () => {
  let component: GameFormComponent;
  let fixture: ComponentFixture<GameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
