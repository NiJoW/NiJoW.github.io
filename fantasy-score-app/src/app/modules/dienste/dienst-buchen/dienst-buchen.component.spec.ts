import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstBuchenComponent } from './dienst-buchen.component';

describe('DienstBuchenComponent', () => {
  let component: DienstBuchenComponent;
  let fixture: ComponentFixture<DienstBuchenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DienstBuchenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstBuchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
