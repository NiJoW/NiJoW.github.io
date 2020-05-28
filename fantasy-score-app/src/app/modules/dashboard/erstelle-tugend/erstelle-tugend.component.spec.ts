import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstelleTugendComponent } from './erstelle-tugend.component';

describe('ErstelleTugendComponent', () => {
  let component: ErstelleTugendComponent;
  let fixture: ComponentFixture<ErstelleTugendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErstelleTugendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErstelleTugendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
