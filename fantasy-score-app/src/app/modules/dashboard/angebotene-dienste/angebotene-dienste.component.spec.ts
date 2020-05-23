import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngeboteneDiensteComponent } from './angebotene-dienste.component';

describe('AngeboteneDiensteComponent', () => {
  let component: AngeboteneDiensteComponent;
  let fixture: ComponentFixture<AngeboteneDiensteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngeboteneDiensteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngeboteneDiensteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
