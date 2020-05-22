import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestenlisteComponent } from './bestenliste.component';

describe('BestenlisteComponent', () => {
  let component: BestenlisteComponent;
  let fixture: ComponentFixture<BestenlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestenlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestenlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
