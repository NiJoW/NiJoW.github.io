import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GebuchteDiensteComponent } from './gebuchte-dienste.component';

describe('GebuchteDiensteComponent', () => {
  let component: GebuchteDiensteComponent;
  let fixture: ComponentFixture<GebuchteDiensteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GebuchteDiensteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GebuchteDiensteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
