import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstelleTugendOverlayComponent } from './erstelle-tugend-overlay.component';

describe('ErstelleTugendOverlayComponent', () => {
  let component: ErstelleTugendOverlayComponent;
  let fixture: ComponentFixture<ErstelleTugendOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErstelleTugendOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErstelleTugendOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
