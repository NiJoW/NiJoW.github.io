import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeplanteDiensteComponent } from './geplante-dienste.component';

describe('GeplanteDiensteComponent', () => {
  let component: GeplanteDiensteComponent;
  let fixture: ComponentFixture<GeplanteDiensteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeplanteDiensteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeplanteDiensteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
