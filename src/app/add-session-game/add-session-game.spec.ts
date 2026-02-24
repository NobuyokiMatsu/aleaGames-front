import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSessionGame } from './add-session-game';

describe('AddSessionGame', () => {
  let component: AddSessionGame;
  let fixture: ComponentFixture<AddSessionGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSessionGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSessionGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
