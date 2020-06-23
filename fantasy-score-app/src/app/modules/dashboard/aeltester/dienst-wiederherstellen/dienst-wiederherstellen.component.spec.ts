import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstWiederherstellenComponent } from './dienst-wiederherstellen.component';

describe('DienstWiederherstellenComponent', () => {
  let component: DienstWiederherstellenComponent;
  let fixture: ComponentFixture<DienstWiederherstellenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DienstWiederherstellenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstWiederherstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
