import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivierteDiensteComponent } from './archivierte-dienste.component';

describe('ArchivierteDiensteComponent', () => {
  let component: ArchivierteDiensteComponent;
  let fixture: ComponentFixture<ArchivierteDiensteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivierteDiensteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivierteDiensteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
