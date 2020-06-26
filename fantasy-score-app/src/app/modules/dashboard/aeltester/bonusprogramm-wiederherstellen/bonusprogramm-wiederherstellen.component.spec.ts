import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusprogrammWiederherstellenComponent } from './bonusprogramm-wiederherstellen.component';

describe('BonusprogrammWiederherstellenComponent', () => {
  let component: BonusprogrammWiederherstellenComponent;
  let fixture: ComponentFixture<BonusprogrammWiederherstellenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusprogrammWiederherstellenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusprogrammWiederherstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
