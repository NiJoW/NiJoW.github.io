import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayComponent } from './overlay.component';

// Source: https://codinglatte.com/posts/angular/reusable-modal-overlay-using-angular-cdk-overlay/
// https://github.com/mainawycliffe/ng-cdk-overlay-demo

describe('OverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
