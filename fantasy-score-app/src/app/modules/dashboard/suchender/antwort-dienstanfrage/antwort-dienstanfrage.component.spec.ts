import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntwortDienstanfrageComponent } from './antwort-dienstanfrage.component';

describe('AntwortDienstanfrageComponent', () => {
  let component: AntwortDienstanfrageComponent;
  let fixture: ComponentFixture<AntwortDienstanfrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntwortDienstanfrageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntwortDienstanfrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
