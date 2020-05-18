import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TugendenComponent } from './tugenden.component';

describe('TugendenComponent', () => {
  let component: TugendenComponent;
  let fixture: ComponentFixture<TugendenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TugendenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TugendenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
