import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TugendLoeschenComponent } from './tugend-loeschen.component';

describe('TugendLoeschenComponent', () => {
  let component: TugendLoeschenComponent;
  let fixture: ComponentFixture<TugendLoeschenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TugendLoeschenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TugendLoeschenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
