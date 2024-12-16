/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostulerService } from './postuler.service';

describe('Service: Postuler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostulerService]
    });
  });

  it('should ...', inject([PostulerService], (service: PostulerService) => {
    expect(service).toBeTruthy();
  }));
});
