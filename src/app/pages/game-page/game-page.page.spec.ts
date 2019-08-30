import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePagePage } from './game-page.page';

describe('GamePagePage', () => {
  let component: GamePagePage;
  let fixture: ComponentFixture<GamePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
