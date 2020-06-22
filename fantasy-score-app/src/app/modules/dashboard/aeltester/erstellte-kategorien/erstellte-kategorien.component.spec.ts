import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstellteKategorienComponent } from './erstellte-kategorien.component';

describe('ErstellteKategorienComponent', () => {
  let component: ErstellteKategorienComponent;
  let fixture: ComponentFixture<ErstellteKategorienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErstellteKategorienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErstellteKategorienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
