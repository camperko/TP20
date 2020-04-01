import { TestBed } from '@angular/core/testing';

import { SellerSettingsService } from './seller-settings.service';

describe('SellerSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerSettingsService = TestBed.get(SellerSettingsService);
    expect(service).toBeTruthy();
  });
});
