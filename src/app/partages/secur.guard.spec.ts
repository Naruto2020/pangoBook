import { TestBed } from '@angular/core/testing';

import { SecurGuard } from './secur.guard';

describe('SecurGuard', () => {
  let guard: SecurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
