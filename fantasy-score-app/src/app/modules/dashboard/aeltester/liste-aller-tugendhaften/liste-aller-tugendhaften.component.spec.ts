import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAllerTugendhaftenComponent } from './liste-aller-tugendhaften.component';

describe('ListeAllerTugendhaftenComponent', () => {
  let component: ListeAllerTugendhaftenComponent;
  let fixture: ComponentFixture<ListeAllerTugendhaftenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAllerTugendhaftenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAllerTugendhaftenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
