import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TugendhaftenFreischaltenComponent } from './tugendhaften-freischalten.component';

describe('TugendhaftenFreischaltenComponent', () => {
  let component: TugendhaftenFreischaltenComponent;
  let fixture: ComponentFixture<TugendhaftenFreischaltenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TugendhaftenFreischaltenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TugendhaftenFreischaltenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
