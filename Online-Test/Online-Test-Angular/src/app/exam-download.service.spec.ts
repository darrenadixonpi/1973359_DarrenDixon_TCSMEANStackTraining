import { TestBed } from '@angular/core/testing';

import { ExamDownloadService } from './exam-download.service';

describe('ExamDownloadService', () => {
  let service: ExamDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
