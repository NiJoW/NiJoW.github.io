import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BearbeiteKategorieComponent } from './bearbeite-kategorie.component';

describe('BearbeiteKategorieComponent', () => {
  let component: BearbeiteKategorieComponent;
  let fixture: ComponentFixture<BearbeiteKategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BearbeiteKategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BearbeiteKategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
