import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GewonneneBonusprogrammeComponent } from './gewonnene-bonusprogramme.component';

describe('GewonneneBonusprogrammeComponent', () => {
  let component: GewonneneBonusprogrammeComponent;
  let fixture: ComponentFixture<GewonneneBonusprogrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GewonneneBonusprogrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GewonneneBonusprogrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
