import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstLoeschenComponent } from './dienst-loeschen.component';

describe('DienstLoeschenComponent', () => {
  let component: DienstLoeschenComponent;
  let fixture: ComponentFixture<DienstLoeschenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DienstLoeschenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstLoeschenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
