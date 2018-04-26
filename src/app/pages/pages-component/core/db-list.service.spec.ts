import { TestBed, inject } from '@angular/core/testing';

import { DbListService } from './db-list.service';

describe('DbListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbListService]
    });
  });

  it('should be created', inject([DbListService], (service: DbListService) => {
    expect(service).toBeTruthy();
  }));
});
