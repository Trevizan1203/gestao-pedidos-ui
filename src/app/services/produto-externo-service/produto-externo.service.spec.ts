import { TestBed } from '@angular/core/testing';

import { ProdutoExternoService } from './produto-externo.service';

describe('ProdutoExternoService', () => {
  let service: ProdutoExternoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoExternoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
