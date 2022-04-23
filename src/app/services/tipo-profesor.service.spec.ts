import { TestBed } from '@angular/core/testing';

import { TipoProfesorService } from './tipo-profesor.service';

describe('TipoProfesorService', () => {
  let service: TipoProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
