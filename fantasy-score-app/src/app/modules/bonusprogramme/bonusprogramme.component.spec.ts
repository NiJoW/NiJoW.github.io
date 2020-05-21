import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusprogrammeComponent } from './bonusprogramme.component';

describe('BonusprogrammeComponent', () => {
  let component: BonusprogrammeComponent;
  let fixture: ComponentFixture<BonusprogrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusprogrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusprogrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
