import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivierteBonusprogrammeComponent } from './archivierte-bonusprogramme.component';

describe('ArchivierteBonusprogrammeComponent', () => {
  let component: ArchivierteBonusprogrammeComponent;
  let fixture: ComponentFixture<ArchivierteBonusprogrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivierteBonusprogrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivierteBonusprogrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
