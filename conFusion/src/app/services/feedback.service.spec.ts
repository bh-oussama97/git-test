import { TestBed } from '@angular/core/testing';

import { FeedbackService } from './feedback.service';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackService);
  });

  it('should be created', () => {
    const service: FeedbackService = TestBed.get(FeedbackService);
    expect(service).toBeTruthy();
  });
});
