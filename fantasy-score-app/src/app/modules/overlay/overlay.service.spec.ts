import { TestBed } from '@angular/core/testing';

import { OverlayService } from './overlay.service';

// Source: https://codinglatte.com/posts/angular/reusable-modal-overlay-using-angular-cdk-overlay/
// https://github.com/mainawycliffe/ng-cdk-overlay-demo

describe('OverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverlayService = TestBed.get(OverlayService);
    expect(service).toBeTruthy();
  });
});
