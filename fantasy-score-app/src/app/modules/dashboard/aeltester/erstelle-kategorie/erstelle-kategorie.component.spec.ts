import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstelleKategorieComponent } from './erstelle-kategorie.component';

describe('ErstelleKategorieComponent', () => {
  let component: ErstelleKategorieComponent;
  let fixture: ComponentFixture<ErstelleKategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErstelleKategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErstelleKategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
