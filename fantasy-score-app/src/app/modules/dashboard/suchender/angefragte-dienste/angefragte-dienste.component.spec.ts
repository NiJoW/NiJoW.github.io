import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngefragteDiensteComponent } from './angefragte-dienste.component';

describe('AngefragteDiensteComponent', () => {
  let component: AngefragteDiensteComponent;
  let fixture: ComponentFixture<AngefragteDiensteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngefragteDiensteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngefragteDiensteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
