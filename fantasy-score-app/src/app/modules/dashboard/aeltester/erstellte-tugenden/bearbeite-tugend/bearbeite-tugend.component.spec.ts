import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BearbeiteTugendComponent } from './bearbeite-tugend.component';

describe('BearbeiteTugendComponent', () => {
  let component: BearbeiteTugendComponent;
  let fixture: ComponentFixture<BearbeiteTugendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BearbeiteTugendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BearbeiteTugendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
