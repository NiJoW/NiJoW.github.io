import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusprogrammBenachrichtigungenComponent } from './bonusprogramm-benachrichtigungen.component';

describe('BonusprogrammBenachrichtigungenComponent', () => {
  let component: BonusprogrammBenachrichtigungenComponent;
  let fixture: ComponentFixture<BonusprogrammBenachrichtigungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusprogrammBenachrichtigungenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusprogrammBenachrichtigungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
