import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErledigteDiensteComponent } from './erledigte-dienste.component';

describe('ErledigteDiensteComponent', () => {
  let component: ErledigteDiensteComponent;
  let fixture: ComponentFixture<ErledigteDiensteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErledigteDiensteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErledigteDiensteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
