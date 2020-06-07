import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstellteTugendenComponent } from './erstellte-tugenden.component';

describe('ErstellteTugendComponent', () => {
  let component: ErstellteTugendenComponent;
  let fixture: ComponentFixture<ErstellteTugendenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErstellteTugendenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErstellteTugendenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
