import { TestBed, inject } from '@angular/core/testing';

import { TopInterpretstionsService } from './top-interpretstions.service';

describe('TopInterpretstionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopInterpretstionsService]
    });
  });

  it('should be created', inject([TopInterpretstionsService], (service: TopInterpretstionsService) => {
    expect(service).toBeTruthy();
  }));
});
