/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OffreService } from './offre.service';

describe('Service: Offre', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffreService]
    });
  });

  it('should ...', inject([OffreService], (service: OffreService) => {
    expect(service).toBeTruthy();
  }));
});
