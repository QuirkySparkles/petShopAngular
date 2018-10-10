import { TestBed } from '@angular/core/testing';

import { PetShopService } from './pet-shop.service';

describe('PetShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetShopService = TestBed.get(PetShopService);
    expect(service).toBeTruthy();
  });
});
