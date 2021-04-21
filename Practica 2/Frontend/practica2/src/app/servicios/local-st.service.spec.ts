import { TestBed } from '@angular/core/testing';

import { LocalSTService } from './local-st.service';

describe('LocalSTService', () => {
  let service: LocalSTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalSTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
