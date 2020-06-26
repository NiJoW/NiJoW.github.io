import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusprogrammLoeschenComponent } from './bonusprogramm-loeschen.component';

describe('BonusprogrammLoeschenComponent', () => {
  let component: BonusprogrammLoeschenComponent;
  let fixture: ComponentFixture<BonusprogrammLoeschenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusprogrammLoeschenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusprogrammLoeschenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
