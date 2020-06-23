import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TugendWiederherstellenComponent } from './tugend-wiederherstellen.component';

describe('TugendWiederherstellenComponent', () => {
  let component: TugendWiederherstellenComponent;
  let fixture: ComponentFixture<TugendWiederherstellenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TugendWiederherstellenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TugendWiederherstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
