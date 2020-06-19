import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BearbeiteBonusprogrammComponent } from './bearbeite-bonusprogramm.component';

describe('BearbeiteBonusprogrammComponent', () => {
  let component: BearbeiteBonusprogrammComponent;
  let fixture: ComponentFixture<BearbeiteBonusprogrammComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BearbeiteBonusprogrammComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BearbeiteBonusprogrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
