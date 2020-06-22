import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivierteTugendenComponent } from './archivierte-tugenden.component';

describe('ArchivierteTugendenComponent', () => {
  let component: ArchivierteTugendenComponent;
  let fixture: ComponentFixture<ArchivierteTugendenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivierteTugendenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivierteTugendenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
