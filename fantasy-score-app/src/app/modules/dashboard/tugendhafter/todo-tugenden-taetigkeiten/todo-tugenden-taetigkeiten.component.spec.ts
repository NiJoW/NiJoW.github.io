import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTugendenTaetigkeitenComponent } from './todo-tugenden-taetigkeiten.component';

describe('TodoTugendenTaetigkeitenComponent', () => {
  let component: TodoTugendenTaetigkeitenComponent;
  let fixture: ComponentFixture<TodoTugendenTaetigkeitenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoTugendenTaetigkeitenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTugendenTaetigkeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
