import { TestBed } from '@angular/core/testing';

import { PushupnotificationsService } from './pushupnotifications.service';

describe('PushupnotificationsService', () => {
  let service: PushupnotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushupnotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
