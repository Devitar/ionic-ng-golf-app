import { TestBed } from '@angular/core/testing';

import { ScoreCardServiceService } from './score-card-service.service';

describe('ScoreCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreCardServiceService = TestBed.get(ScoreCardServiceService);
    expect(service).toBeTruthy();
  });
});
