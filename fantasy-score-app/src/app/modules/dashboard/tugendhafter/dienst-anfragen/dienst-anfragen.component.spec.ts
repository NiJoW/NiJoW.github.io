import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstAnfragenComponent } from './dienst-anfragen.component';

describe('DienstAnfragenComponent', () => {
  let component: DienstAnfragenComponent;
  let fixture: ComponentFixture<DienstAnfragenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DienstAnfragenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstAnfragenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
