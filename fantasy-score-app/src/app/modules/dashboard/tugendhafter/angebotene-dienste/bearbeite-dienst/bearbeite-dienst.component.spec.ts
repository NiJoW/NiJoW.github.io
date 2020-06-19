import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BearbeiteDienstComponent } from './bearbeite-dienst.component';

describe('BearbeiteDienstComponent', () => {
  let component: BearbeiteDienstComponent;
  let fixture: ComponentFixture<BearbeiteDienstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BearbeiteDienstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BearbeiteDienstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
