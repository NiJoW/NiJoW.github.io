import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstelleDienstComponent } from './erstelle-dienst.component';

describe('ErstelleDienstComponent', () => {
  let component: ErstelleDienstComponent;
  let fixture: ComponentFixture<ErstelleDienstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErstelleDienstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErstelleDienstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
