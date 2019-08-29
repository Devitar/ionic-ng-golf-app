import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerConfigPage } from './player-config.page';

describe('PlayerConfigPage', () => {
  let component: PlayerConfigPage;
  let fixture: ComponentFixture<PlayerConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerConfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
