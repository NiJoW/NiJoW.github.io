import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstellteBonusprogrammeComponent } from './erstellte-bonusprogramme.component';

describe('ErstellteBonusprogrammeComponent', () => {
  let component: ErstellteBonusprogrammeComponent;
  let fixture: ComponentFixture<ErstellteBonusprogrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErstellteBonusprogrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErstellteBonusprogrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
