import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstelleBonusprogrammComponent } from './erstelle-bonusprogramm.component';

describe('ErstelleBonusprogrammComponent', () => {
  let component: ErstelleBonusprogrammComponent;
  let fixture: ComponentFixture<ErstelleBonusprogrammComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErstelleBonusprogrammComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErstelleBonusprogrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
