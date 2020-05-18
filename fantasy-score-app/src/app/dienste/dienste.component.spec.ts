import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiensteComponent } from './dienste.component';

describe('DiensteComponent', () => {
  let component: DiensteComponent;
  let fixture: ComponentFixture<DiensteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiensteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiensteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
