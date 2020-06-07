import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErfuellteTugendenComponent } from './erfuellte-tugenden.component';

describe('ErfuellteTugendenComponent', () => {
  let component: ErfuellteTugendenComponent;
  let fixture: ComponentFixture<ErfuellteTugendenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErfuellteTugendenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErfuellteTugendenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
